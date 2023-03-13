import os
import uuid
import json
from datetime import datetime
from typing import Optional, Dict, ForwardRef, Union

from dyntastic import Dyntastic
import boto3
from pydantic import Field, typing, EmailStr

#from UserRegistrationSE.backend.app.models.enums import countryAbbreviation
from .country_enums import countryAbbreviation

aws_secure = open('aws.json')
aws_data = json.load(aws_secure)

for entry in aws_data:
    print(f"{entry}: {aws_data[entry]}")


Entitlement = ForwardRef('Entitlement')

AWS_ACCESS_KEY_ID = aws_data["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = aws_data["AWS_SECRET_ACCESS_KEY"]




class DyntasticSecured(Dyntastic):
    __table_name__ = "foo"
    __hash_key__ = "id"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

    @classmethod
    def _dynamodb_resource(cls):
        if cls._dynamodb_resource_instance is None:  # type: ignore
            if cls.__table_region__:
                resource = boto3.resource("dynamodb", region_name='us-east-1',
                                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                )
            else:
                resource = boto3.resource("dynamodb",region_name='us-east-1', aws_access_key_id=AWS_ACCESS_KEY_ID,
                                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY,)
            cls._dynamodb_resource_instance = resource  # type: ignore
            try:
                resource.Table(cls.__table_name__).table_status
            except:
                cls.create_table()
                cls._dynamodb_resource_instance = resource
        return cls._dynamodb_resource_instance  # type: ignore

    @classmethod
    def _dynamodb_client(cls):
        if cls._dynamodb_client_instance is None:  # type: ignore
            if cls.__table_region__:
                client = boto3.client("dynamodb", region_name='us-east-1',
                                      aws_access_key_id='',
                                      aws_secret_access_key='',
                                      )
            else:
                client = boto3.client("dynamodb", aws_access_key_id='', aws_secret_access_key='',region_name='us-east-1')
            cls._dynamodb_client_instance = client  # type: ignore
        return cls._dynamodb_client_instance  # type: ignore

class Organization(DyntasticSecured):
    __table_name__ = "organization"
    __hash_key__ = "id"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str]
    address: Optional[str]
    email: Optional[str]

class Country(DyntasticSecured):
    __table_name__ = "country"
    __hash_key__ = "id"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    country_abbr: countryAbbreviation

class FieldWorkLocation(DyntasticSecured):
    __table_name__ = "field_work_location"
    __hash_key__ = "id"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    country: Country
    location: str

class Entitlement(DyntasticSecured):
    __table_name__ = "entitlement"
    __hash_key__ = "id"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = None
    subEntitlements: Optional[typing.Dict[str, Entitlement]]=None

class User(DyntasticSecured):
    __table_name__ = "user"
    __hash_key__ = "id"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    cognito_id: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    newsletter: Optional[bool]
    entitlementDict: Optional[Dict[str, Entitlement]]
    authToken: Optional[str]
    photo: Optional[bytes]
    entitlement: Optional[Entitlement]
    #organization: Optional[Organization]
    organization: Optional[str]
    organization_verified: Optional[bool]
    interests: Optional[str]
    #country_of_residence: Optional[Country]
    country_of_residence: Optional[str]
    fieldwork_locations_verified: Optional[FieldWorkLocation]
    fieldwork_locations: Optional[str]
    #social_media: Optional[str]
    linkedin: Optional[str]
    facebook: Optional[str]
    twitter: Optional[str]
    created: Optional[str]
    updated: Optional[str]