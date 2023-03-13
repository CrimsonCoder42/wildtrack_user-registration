import logging
import os
import json
from functools import wraps
from dyntastic import A
from datetime import datetime

import boto3
from flask import Flask, jsonify, request, Response
from flask_cors import CORS


# from UserRegistrationSE.backend.app.models.main import User
# from UserRegistrationSE.backend.cognito_controller import CognitoIdentityProviderWrapper

from models.main import User
from cognito_controller import CognitoIdentityProviderWrapper

secure = open('secure.json')
secure_data = json.load(secure)
# for entry in secure_data:
#    print(f"key : {entry} value: {secure_data[entry]}")


app = Flask(__name__)
CORS(app)

# USER_POOL_ID = os.getenv('COGNITO_USERPOOL_ID')
# CLIENT_ID = os.getenv('COGNITO_APP_CLIENT_ID')
# CLIENT_SECRET = os.getenv('AWS_COGNITO_CLIENT_SECRET')
# REGION = os.getenv("COGNITO_REGION")

USER_POOL_ID = secure_data['COGNITO_USERPOOL_ID']
CLIENT_ID = secure_data['COGNITO_APP_CLIENT_ID']
CLIENT_SECRET = secure_data['AWS_COGNITO_CLIENT_SECRET']
REGION = secure_data["COGNITO_REGION"]

logger = logging.getLogger(__name__)
cognito_controller = CognitoIdentityProviderWrapper(
    cognito_idp_client=boto3.client('cognito-idp', region_name='us-east-1'),
    user_pool_id=USER_POOL_ID,
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET)


# Authentication decorator
def token_required(f):
    '''
    decorator for routes to require login credentials;
    checks if user with provided token exists in Cognito, if not - raise
    examples of usage:

    @app.route('/')
    @token_required
    def index(user):
        return "This is the main page."
    '''

    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        # ensure the jwt-token is passed with the headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].replace("Bearer", "").strip()
        if not token:  # throw error if no token provided
            return Response(
                "Valid token is missing",
                status=401,
            )
        try:
            current_user = cognito_controller.get_user_by_token(access_token=token)
            current_user = {x["Name"]:x["Value"] for x in current_user["UserAttributes"]}
            current_user["AccessToken"] = token
        except:
            return Response(
                "Invalid token",
                status=401,
            )
        return f(current_user, *args, **kwargs)
        # Return the user information attached to the token

    return decorator

def check_in_dct(dict_to_check, list_of_keys):
    missing_keys = []
    for key in list_of_keys:
        if dict_to_check.get(key) is None:
            missing_keys.append(key)
    return len(missing_keys) == 0, missing_keys


@app.route('/')
def index():
    return "This is the main page."


@app.route('/_api/v1/signup', methods=['POST'])
def signup():
    '''
    on signup,three processes should be done:
    1. generate user in UserPool
    2. generate user in DynamoDB
    3. generate user_profile associated with user in DynamoDB
    '''
    data = request.json  # a multidict containing POST data
    if data is not None:
        is_valid, missing_keys = check_in_dct(data, ["email", "first_name", "last_name", "newsletter"])
        if not is_valid:
            return Response(
                "Missing required fields: " + ", ".join(missing_keys),
                status=400,
            )
        response = cognito_controller.sign_up_user(user_name=data["email"], password=data["password"],
                                                   user_email=data["email"])
        if response['alreadyExist']:
            return Response(
                "User already exists",
                status=400,
            )
        user = User(cognito_id=response["UserSub"], email=data["email"],
                    first_name=data["first_name"], last_name=data["last_name"],
                    newsletter=data["newsletter"])

        user.save()
        return jsonify({"message": 'check your email for registration confirmation link'})

    # return jsonify(aws_controller.get_items())

@app.route('/_api/v1/user/new', methods=['POST'])
@token_required
def create_user(user):
    '''
    this route creates new User in DynamoDB, associated with corresponding User in Cognito
    ! NB ! don't use with signup route! Use this route when creation user on Cognito is handled via front-end
    '''
    user = User(cognito_id=user["sub"], email=user["email"])

    user.save()
    return jsonify({"message": 'check your email for registration confirmation link'})

    # return jsonify(aws_controller.get_items())

@app.route('/_api/v1/signup/confirm', methods=['POST'])
def signup_confirm():
    data = request.json  # a multidict containing POST data
    if data is not None:
        try:
            cognito_controller.confirm_user_sign_up(user_name=data["email"],
                                                    confirmation_code=data["confirmation_code"])
            return jsonify({'message': 'you are successfully signed up!'})
        except Exception as e:
            print(f"Exception is {e}")
            return Response(
                "Invalid email/code",
                status=400,
            )

#TODO: query for DynamoDB does not work appropriately; we ned to know id in DB to filter overt it, which makes no sence
@app.route('/_api/v1/delete_user', methods=['DELETE'])
@token_required
def delete_user(user):
    '''
    route to delete user allows two scenario:
    1. user wants to delete themselves: only token provided - always allow
    2. user wants to delete other user: provided own token and user to delete - check permission
    '''

    # if data.get("User") is None: #scenario1:
    #     pass
    try:
        id_value = get_id_from_cognito_id(user['sub'])
        if id_value is None:
            logger.error("User does not exist")
            return Response(
                "User does not exist",
                status=400,
            )
        db_user = User.get(id_value)
        db_user.delete()
        cognito_controller.delete_user(access_token=user["AccessToken"])
        return jsonify({'message': 'Your account was successfully deleted'})
    except:
        return Response(
            "Cannot delete user",
            status=400,
        )

@app.route('/_api/vi/signup/resend-code', methods=['POST'])
def signup_resend_code():
    data = request.json  # a multidict containing POST data
    if data is not None:
        try:
            cognito_controller.resend_confirmation(user_name=data["email"])
            return jsonify({'message': 'confirmation code resent'})
        except:
            return Response(
                "Invalid email/code",
                status=400,
            )

    # return jsonify(aws_controller.get_items())



# @app.route('/_api/v1/check-db', methods=['GET'])
# def test_db():
#     '''
#     Dummy method to save hardcoded object in DB, should be removed once component is finished
#     '''
#     try:
#         org = User(name="test user")
#         org.save()
#         return jsonify({'message': 'created'})
#     except:
#         return Response(
#             "Something went wrong during saving",
#             status=400,
#         )


# Johann routes
@app.route('/_api/v1/signin', methods=['POST'])
def signin():
    data = request.json  # a multidict containing POST data
    if data is not None:
        response = cognito_controller.start_sign_in_basic(user_name=data["email"], password=data["password"])
        if response['success']:
            user = cognito_controller.get_user_by_token(access_token=response["AuthenticationResult"]["AccessToken"])
            # success.authToken probably something like this
            return jsonify({'access_token': response["AuthenticationResult"]["AccessToken"],
                            'refresh_token': response["AuthenticationResult"]["RefreshToken"],
                            'id_token': response["AuthenticationResult"]["IdToken"],
                            'user_id': user["Username"]
                            }
                           )
        else:
            return Response(
                response['error'],
                status=400,
            )


# TODO: provide error-code in case of failure. jsonify will return 200;
@app.route('/_api/v1/signout', methods=['POST'])
def signout():
    data = request.json  # a multidict containing POST data
    if data is not None:
        # TODO: should be an access_token instead?
        success = cognito_controller.sign_out(access_token=data["AccessToken"])
        if success:
            return jsonify({'message': 'you are successfully signed out!'})
        return Response(
            "Error",
            status=400,
        )


@app.route('/_api/v1/refresh_token', methods=['POST'])
def refresh_token():
    data = request.json
    if data is not None:
        try:
            #TODO: check, should we pass that in headers?
            user_name=data["user_id"]
            refresh_token=data["refresh_token"]
            response = cognito_controller.refresh_token(user_name=user_name, refresh_token=refresh_token)
            return jsonify({'access_token': response["AuthenticationResult"]["AccessToken"],
                            'id_token': response["AuthenticationResult"]["IdToken"],
                            }
                           )
        except:
            return Response(
                "Something went wrong",
                status=400,
            )
    return Response(
        "Error",
        status=400,
    )

def get_id_from_cognito_id(cognito_id):


    print("Get id from cognito")
    #output = User.query(A.cognito_id == user['sub'], index="cognito_id-index")
    output = User.query(A.cognito_id == cognito_id, index="cognito_id-index")
    print(output)
    entry_array = []
    for entry in output:
        entry_str = str(entry)
        print(type(entry_str))
        entry_array = entry_str.split(' ')
        print(f"\n\nENTRY {entry_array}")
        #print(entry_array)
    if len(entry_array) == 0:
        return None
    print(entry_array[0])
    id_array = entry_array[0].split('=')
    #print(f"ID array: {id_array[1]}")
    id_value = id_array[1].replace("'","")
    #print(f"VALUE: {id_value}")

    return id_value

# TODO: should't this be a GET method with params in URL, since we get user, not post
@app.route('/_api/v1/get_user', methods=['GET'])
@token_required
def get_user(user):        
    print(request.headers)    
    print(user)         
    print("\n\n\n") 

    #output = str(User.get('8a1c4089-9723-4e75-9928-2b2b85bb2c28')).replace('=',':')
    #output = str(User.get(cognito_id=user['sub'])).replace('=',':')

    #  Search for cognito id
    # output = User.query(A.cognito_id == user['sub'], index="cognito_id-index")
    # print(output)
    # for entry in output:
    #     entry_str = str(entry)
    #     print(type(entry_str))
    #     entry_array = entry_str.split(' ')
    #     print(f"\n\nENTRY {entry_array}")
    #     #print(entry_array)
    # print(entry_array[0])
    # id_array = entry_array[0].split('=')
    # #print(f"ID array: {id_array[1]}")
    # id_value = id_array[1].replace("'","")
    # #print(f"VALUE: {id_value}")

    id_value = get_id_from_cognito_id(user['sub'])
    print(id_value)

    #   get user information based off of the now found id
    user_info = User.get(id_value)
    #print(f"User info: {user_info}")
    return_json = "{"
    for i in user_info:
        return_json = f"{return_json} {i[0]}:{i[1]},"
    return_json = return_json[:-1] + " }"
    #for i in user_info:


    print(f"Return json {return_json}")    

    success = True
    if success:
        #return jsonify({'message': 'Token successfully refreshed!'})
        #return jsonify(return_json)
        return return_json
    else:
        return jsonify({"message": 'Error'})



@app.route('/_api/v1/update_user', methods=['POST'])
@token_required
def update_user(user):
    """

        
        This is expected from the User class

        id: str = Field(default_factory=lambda: str(uuid.uuid4()))
        cognito_id: str
        first_name: str
        last_name: str
        email: EmailStr
        entitlementDict: Optional[Dict[str, Entitlement]]

        authToken: Optional[str]
        photo: Optional[bytes]
        entitlement: Optional[Entitlement]
        organization_verified: Optional[Organization]
        organization_cust: Optional[str]
        interests: Optional[str]
        #country_of_residence: Optional[Country]
        country_of_residence: Optional[str],
        fieldwork_location_verified: Optional[FieldWorkLocation]
        fieldwork_location: Optional[str]
        #social_media: Optional[str]
        linkedin: Optional[str],
        facebook: Optional[str],
        twitter: Optional[str]

        This is expected from front end class
        {
            "first_name": "Melinda",
            "last_name": "Marcus",
            "organization": "San Diego Zoo",
            "position": "Director",
            "role": "Contributor",
            "interests": "Big Cats",
            "country_of_residence": "United States of America",
            "fieldwork_locations": "San Diego, California, USA",
            "linkedin": "https://linkedin.com/mmarcus",
            "facebook": "https://facebook.com/mmarcus",
            "twitter": "https://facebook.com/mmarcus",
            "created": "February 21, 2023",
            "updated": "February 22, 2023"
        } (edited) 

    """
    success=False
    # Get original user data (need to work on the Auth piece here)
    data = request.json  # a multidict containing POST data
    ### Need to erify some data back
    try:
        # Setup current time
        update_time =  datetime.now().strftime("%B %d, %Y at %H:%M")
        print(update_time)
        #output = User.get('8a1c4089-9723-4e75-9928-2b2b85bb2c28')

        # Get current user information:
        #user = User.get('8a1c4089-9723-4e75-9928-2b2b85bb2c28')
        #output = User.query(A.cognito_id == user['sub'], index="cognito_id-index")
        id_value = get_id_from_cognito_id(user['sub'])
        print(id_value)

        #   get user information based off of the now found id
        user_info = User.get(id_value)
        print(f" OUTPUT : {user_info}")
        # Loop through json data that has been given, and update each field
        for i in data.keys():
            if i == "id" or i == "cognito_id":
                continue

            function_name = f"user_info.update(A.{i}.set(data[i]))"
            #user.updaate(A.i.set(data[i]))
            print(f"function: {function_name}")
            result = eval(function_name)
            print(f"result is : {result}")
            success = True  
        
        # Add on the updated time :)
        function_name = f"user_info.update(A.updated.set(update_time))"
        print(f"function: {function_name}")
        result =eval(function_name)
        print(f"result is {result}")


        #output = User.get('8a1c4089-9723-4e75-9928-2b2b85bb2c28')
        output = User.get(id_value)
        # Translate output into returnable json
        return_json = "{"
        for i in output:
            return_json = f"{return_json} {i[0]}:{i[1]},"
        return_json = return_json[:-1] + " }"

        print(return_json)
            # get user data again and return it
        
        success = True

        
    except Exception as e:
        print(f"Error: {e}")

              
    if success:
        #return jsonify({'message': 'Token successfully refreshed!'})
        return return_json
    else:
        return jsonify({"message": 'Error'})


#     data = request.json ## multidict containing POST data
#     if data is not None:
#         ## Check User information
#         ##
#         ##
#         ## Faking success as true to continue
#         success = True
#         if success:
#             print(user.save())

        



if __name__ == '__main__':
    app.run(host='0.0.0.0')
