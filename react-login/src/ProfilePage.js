/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import Navbar from "./Navbarloggedin";
import React, { useState, useEffect } from "react"
import { Form, Button, Input } from "antd"



const profileJson = JSON.parse(`
  {
    "first_name": "Melinda",
    "last_name": "Marcus",
    "organization": "San Diego Zoo",
    "position": "Director",
    "role": "Contributor",
    "interests": "Big Cats",
    "country": "United States of America",
    "fieldwork_locations": "San Diego, California, USA",
    "linkedin": "https://linkedin.com/mmarcus",
    "facebook": "https://facebook.com/mmarcus",
    "twitter": "https://facebook.com/mmarcus",
    "created": "February 21, 2023",
    "updated": "February 22, 2023"
  }`
)

// const profileJson = '{"first_name": Melinda}'
// const obj = JSON.parse(profileJson)

export default function (props) {
  let [profilepic, setprofilepic] = useState(<i class="fa fa-user fa-5x icon" style={{"background-color":"white", "color":"#348e47"}}></i>)
  const [isReadOnly,setisReadOnly] = useState(true)
  const [userProfile, setuserProfile] = useState([])
  const [first_name,setfirst_name] = useState(userProfile.first_name)
  const [loading, setloading] = useState(true)
  const [form] = Form.useForm();
  const [counter, setcounter] =useState(0)

  const deletes = () =>{
    if (window.confirm('Are you sure you want to delete your profile?')) {
      // Save it!
      console.log('Profile has been deleted')
      console.log(userProfile[0].id);
    } else {
      // Do nothing!
      console.log('Your profile has not been deleted');
    }
  }
 function readOnlyFx (){
  if(counter == 0){
  setisReadOnly(prevState => !prevState)
  setcounter(counter+1)
  } else{
  updating()
  alert("Your profile has been updated!")
}
 }
  const updating = async(e) =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
  };
  
  fetch('https://jsonplaceholder.typicode.com/users', requestOptions)
      .then(response => response.json())
      console.log(userProfile)
      .then(data => this.setuserProfile(
      {"first_name": "Melinda",
      "last_name": "Marcus",
      "organization": "San Diego Zoo",
      "position": "1",
      "role": "Contributor",
      "interests": "Big Cats",
      "country_of_residence": "United States of America",
      "fieldwork_locations": "San Diego, California, USA",
      "linkedin": "https://linkedin.com/mmarcus",
      "facebook": "https://facebook.com/mmarcus",
      "twitter": "https://facebook.com/mmarcus",
      "created": "February 21, 2023",
      "updated": "February 22, 2023" }));
  }

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json()
      })
      .then(data => {
       setuserProfile(data)
       setloading(false)

        setters()
      
      })
      .catch((err)=>{
        setloading(false)
      })
  }
  function setters () {
    console.log("setters")
    var s =document.getElementById('first_name').value = document.getElementById('last_name').value 
    s.value = "new value"
    console.log(document.getElementById('first_name'))
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!loading){
  return (
    
    <div>
      <Form form={form}>
     
        
      
 <Navbar />  
        
      <div class="container" style={{display:"flex", "margin-top": 60, height: "100%","margin-bottom":100 }}>
        <div style={{ width:"35%","border-right":"3px solid black", "text-align":"center",height: "764.16px", }}>
          <h3 style={{color:"#348e47", "text-align":"center"}}><b>My WildTrack Account</b></h3>
          {profilepic === '' ? null : <span style={{
          fontWeight: 'bold',
          color: 'black', 'font-size': '10px'
        }}>{profilepic}</span>}
       
 
         <Form.Item colon={false}
            className="Form-label"
            name="firstnamelastname"
            id="firstnamelastname"
            initialValue={userProfile.length ? userProfile[0].name : "email"}
            label= {<h4 style={{"width":"180px", "margin-left":"90px", "margin-top":"30px"}}><b>{userProfile.length ? userProfile[0].firstnamelastname : "email"}</b></h4>}
          >
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="position"
            id="position"
            initialValue={userProfile.length ? userProfile[0].position : "email"}
            label= {<h4 style={{"width":"180px", "font-size":"14px","margin-left":"70px", "margin-top":"30px"}}>{userProfile.length ? userProfile[0].position : "email"}</h4>}
          >
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="firstnamelastname"
            id="firstnamelastname"
            initialValue={userProfile.length ? userProfile[0].name : "email"}
            label= {<h4 style={{"width":"180px", "margin-left":"60px", "margin-top":"30px"}}><b>User Role</b></h4>}
          >
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="position"
            id="position"
            initialValue={userProfile.length ? userProfile[0].position : "email"}
            label= {<h4 style={{"width":"180px", "font-size":"14px","margin-left":"70px"}}>{userProfile.length ? userProfile[0].position : "email"}</h4>}
          >
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="createdtag"
            id="createdtag"
            label= {<h4 style={{"width":"180px", "margin-left":"50px", "margin-top":"30px"}}><b>Created</b></h4>}
          >
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="created"
            id="created"
            initialValue={userProfile.length ? userProfile[0].position : "email"}
            label= {<h4 style={{"width":"180px", "font-size":"14px","margin-left":"70px"}}>{userProfile.length ? userProfile[0].created : "email"}</h4>}
          >
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="updatedtag"
            id="updatedtag"
            label= {<h4 style={{"width":"180px", "margin-left":"50px", "margin-top":"30px"}}><b>Updated</b></h4>}
          >
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="updated"
            id="updated"
            initialValue={userProfile.length ? userProfile[0].position : "email"}
            label= {<h4 style={{"width":"180px", "font-size":"14px","margin-left":"70px"}}>{userProfile.length ? userProfile[0].updated: "email"}</h4>}
          >
   </Form.Item>
         <button style={{"background-color":"red", "color": "white", "border":"none", "padding-top":"5px","padding-bottom":"5px", "padding-right":"15px",
        "padding-left":"15px"}} type="button" onClick={deletes}>Delete Account</button>
        </div>
        
        

        <br/>
        <br/>

        <div style={{width:"65%", height: "100%", "padding-left":"80px"}}>
        <h3 style={{color:"#348e47","margin-left":"150px"}}><b>Edit WildTrack Profile</b>
        </h3>
        <div style={{"display": "flex","margin-left":"150px", "margin-top":"30px"}}>
      
       
    </div>
    <br/>
   
    <Form.Item colon={false}
            className="Form-label"
            name="firstName"
            id="firstName"
            initialValue={userProfile.length ? userProfile[0].firstName : "email"}
            label= {<h4 style={{"width":"180px"}}><b>First Name</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="First Name"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="lastName"
            id="lastName"
            initialValue={userProfile.length ? userProfile[0].lastName : "email"}
            label= {<h4 style={{"width":"180px"}}><b>Last Name</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="Last Name"
            />
   </Form.Item>

      <Form.Item colon={false}
            className="Form-label"
            name="Organization"
            id="Organization"
            initialValue={userProfile.length ? userProfile[0].Organization : "email"}
            label= {<h4 style={{"width":"180px"}}><b>Organization</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="Organization"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Position"
            id="Position"
            initialValue={userProfile.length ? userProfile[0].Position: "email"}
            label= {<h4 style={{"width":"180px"}}><b>Position</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="Position"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Interests"
            id="Interests"
            initialValue={userProfile.length ? userProfile[0].Interests: "email"}
            label= {<h4 style={{"width":"180px"}}><b>Interests</b></h4>}
          >
            <textarea class="ant-input css-dev-only-do-not-override-1km3mtt"
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%", "height": "78px", "border-color":"#d9d9d9" }}
              placeholder="Interests"
              type="textarea"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="CountryofPrimaryResidence"
            id="CountryOfPrimaryResidence"
            initialValue={userProfile.length ? userProfile[0].CountryOfPrimaryResidence : "email"}
            label= {<h4 style={{"width":"180px","height":"90px"}}><b>Country Of Primary<br/> Residence</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%", "height": "50px"}}
              placeholder="Country Of Primary Residence"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="FieldworkLocations"
            id="FieldworkLocations"
            initialValue={userProfile.length ? userProfile[0].FieldworkLocations : "email"}
            label= {<h4 style={{"width":"180px"}}><b>Fieldwork Locations</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="Fieldwork Locations"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="LinkedIn"
            id="LinkedIn"
            initialValue={userProfile.length ? userProfile[0].LinkedIn : "email"}
            label= {<h4 style={{"width":"180px"}}><b>LinkedIn</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="LinkedIn"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Facebook"
            id="Facebook"
            initialValue={userProfile.length ? userProfile[0].Facebook : "email"}
            label= {<h4 style={{"width":"180px"}}><b>Facebook</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="Facebook"
            />
   </Form.Item>
   <Form.Item colon={false}
            className="Form-label"
            name="Twitter"
            id="Twitter"
            initialValue={userProfile.length ? userProfile[0].Twitter: "email"}
            label= {<h4 style={{"width":"180px"}}><b>Twitter</b></h4>}
          >
            <Input
              maxLength={10}
              readOnly={isReadOnly}
              style={{ "margin-left":"70px" , "width":"75%" }}
              placeholder="Twitter"
            />
   </Form.Item>

    <br/>
    
    <div class="containing" style={{"display":"flex",}}>
      <div style={{"width":"50%","margin":"auto"}}>
      <button data-toggle="modal" data-target="#exampleModal" type="button"  onClick={readOnlyFx} style={{"border-radius":"0px","border":"none","background-color":"green", "padding-top":"5px","padding-bottom":"5px", "padding-left":"15px","padding-right":"15px", "color":"white"}}>Update Profile</button>
      </div>
      </div>


       </div> 
    </div>
    </Form>
    </div>
    
  )

}
return null;
}


/* let [profilepic, setprofilepic] = useState(<i class="fa fa-user fa-5x icon" style={{"background-color":"white", "color":"#348e47"}}></i>)

 


    return ( <div>
     
    </div>
);*/