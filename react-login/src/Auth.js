/* eslint-disable import/no-anonymous-default-export */

import React, { useState } from "react"
import logos from "./backgrounding.jpg"
import "bootstrap-icons/font/bootstrap-icons.css";
import validator from "validator"
import watermarks from "./watermark.png"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom";
import PrivacyPolicy from "./Privacy.pdf"

export default function (props) {
    
  let [authMode, setAuthMode] = useState("signin")
  const [emailError, setEmailError] = useState(<div style={{"display":"none"}}></div>)
  let [emailInvalid, setEmailInvalid] = useState(0)
  let [passwordShown, setPasswordShown] = useState(false);
  let [pswdInvalid, setPasswordInvalid] = useState('')
  let [pswdChecker, setPasswordChecker] = useState(0)
  const [emailError2, setEmailError2] = useState('')
  let [emailInvalid2, setEmailInvalid2] = useState(0)
  let [pswdChecker2, setPasswordChecker2] = useState(0)
  let [pswdInvalid2, setPasswordInvalid2] = useState('')
  const navigate = useNavigate()

  const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

  resizeOps();
  window.addEventListener("resize", resizeOps);
  const validatePswd = (e) => {
    var pswd = e.target.value
  
    if (validator.isStrongPassword(pswd, {minLength:8, minUppercase: 1, minNumbers: 1, minSymbols: 0})){
      setPasswordInvalid(<div style={{"color": "green", "font-size":"10px","margin-left": "50px"}}>Valid Email</div>)
      setPasswordChecker(1)
      
    } else{
      setPasswordInvalid(<div style={{"color": "red","font-size":"10px", "margin-left": "50px"}}>Please put in a valid password with at least 8 characters, one number, and one uppercase letter.</div>)
     
    }
  }

  const validatePswd2 = (e) => {
    var pswd2 = e.target.value
  
    if (validator.isStrongPassword(pswd2, {minLength:8, minUppercase: 1, minNumbers: 1, minSymbols: 0})){
      setPasswordInvalid2(<div style={{"color": "green", "font-size":"10px","margin-left": "50px"}}>Valid Email</div>)
      setPasswordChecker2(1)
      
    } else{
      setPasswordInvalid2(<div style={{"color": "red","font-size":"10px","margin-left": "50px"}}>Please put in a valid password with at least 8 characters, one number, and one uppercase letter.</div>)
     
    }
  }
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError(<div style={{"color": "green","margin-left": "50px"}}>Valid Email</div>)
      setEmailInvalid(1)
    } else {
      setEmailError(<div style={{"color": "red","margin-left": "50px"}}>Please enter valid email</div>)
    }
  }
  const validateEmail2 = (e) => {
    var emails = e.target.value
  
    if (validator.isEmail(emails)) {
      setEmailError2(<div style={{"color": "green","margin-left": "50px"}}>Valid Email</div>)
      setEmailInvalid2(1)
    } else {
      setEmailError2(<div style={{"color": "red","margin-left": "50px"}}>Please enter valid email</div>)
    }
  }
  
  function handleSubmit2(event) {
    if(emailInvalid2 === 0 || pswdChecker2 === 0){
    event.preventDefault();
    console.log("clicked")
  } else{
    console.log("name")
    navigate("profile", {state: "valid"})
  }
  }
  const togglePassword = (event) => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
    event.preventDefault();
  };


  
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }
  

  if (authMode === "signin") {
    return (
        <div>
              <div className="Auth-form-container" style={{backgroundImage: `url(${logos})`, "background-repeat":"no-repeat", "background-size": "cover", "display": "flex", "justify-content":"center","align-items":"stretch","width": "100vw","height":"100vh","flex-direction":"row","flex-wrap":"wrap", "align-content":"stretch" }}>
                <div class="picture" style={{"display" :"block", "textAlign":"center", "margin-top":"30px","horizontal-align":"center", "height":"5px"}}>
              <img src={watermarks} alt= "Wildtrack logo" style= {{"width": "15%" }} />
              </div>
              
        <form className="Auth-form" style={{"border-radius": "0px", "height": "490px", "padding-top":"10px"}} >
          <div className="Auth-form-content" style={{"height": "420px",  "justifyContent":"center", "padding-top":"105px"}}>
            <h1 className="Auth-form-title" style={{color: "#348e47", }}>Log In to WildTrack!</h1>
            
            
            <p className="text-center mt-2" style={{"padding-bottom": "15px", "padding-top": "5px", "color":"#4E342E" }}>
            <br/>
            <a href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/forgotPassword?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fwildtrack.org%2F" style={{"color":"#4E342E"}}><b> Forgot your password?</b></a>
            </p>

            <br/>
            <div className="d-grid gap-2 mt-3" style={{"text-align": "center", "margin-bottom": "20px"}}>
              <button style={{ "background-color":"#348e47","border":"2px solid white", "padding-top":"5px","padding-bottom":"5px", "padding-left": "30px",  "padding-right": "30px", "border-radius": "0px"}} type="button" className="btn btn-primary">
                <a style={{"text-decoration-line": "none", "color": "white"}}href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/login?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fwildtrack.org%2F"><b>Log In</b></a>
              </button>
            </div>

         
          </div>
        </form>
        <div className="signup-container" style={{"text-align":"center","background-color": "#348e47", "color": "white",  "width":"420px" , "height":"490px",  "padding-top":"115px","display": "inline-block","padding-bottom":"20px", "justify-content": "center", "vertical-align":"middle"}}>
        <h1 style={{ "font-size" :"24px", "padding-bottom": "20px"}}><b>No account yet?</b></h1>
        <h4 style={{"padding-bottom": "30px", "line-height": "2.5"}}>Sign up for an account below.</h4>
        <div className="form-group mt-3" style={{ "display":"flex", "padding-left": "20px"}}>
          <input style={{"width": "5%", "text-align": "center", "height":"5%", "margin-right": "15px"}}
              type="checkbox"
              className="form-control mt-1"
              required
            />
            
            <label style={{"color":"white"}}><a style={{"text-decoration":"underline","color":"white"}}href={PrivacyPolicy} target= "_blank">Privacy Notice:</a> I agree to the terms and conditions</label>
            
          </div>
          <div className="form-group mt-3" style={{"margin": "0px", "display":"flex"  ,"padding-left": "20px"}}>
             <input style={{"width": "5%", "text-align": "center", "height":"5%","margin-right": "15px" }}
              type="checkbox"
              name="newsletter"
              className="form-control mt-1"
            />
             <label style={{"color":"white"}}>Send me the WildTrack newsletter</label>
          </div>
          <br/><br/>
        <button className="link-primary"  style={{"background-color": "white", "color": "#348e47", "padding-top": "5px","padding-bottom": "5px", "padding-left": "35px", "padding-right": "35px", "border":"2px solid white"}}>
                <a style={{"color": "#348e47"}}href="https://wildtrack-auth.auth.us-east-1.amazoncognito.com/signup?client_id=4fq158udhrjm94ek98u4a9fhi2&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fwildtrack.org%2F"><b>Sign Up</b></a>
              </button>
              </div>
      </div>
      
      </div>
    )
  }

  return (
    <div>
          <div id="animate-area" className="Auth-form-container" style={{ "background-repeat":"no-repeat", "background-size": "cover", "display": "flex", "place-content":"center","align-items":"center","width": "100vw","height":"100%","flex-flow":"row wrap","flex-direction":"column","flex-wrap":"nowrap", }}>
          <div class="picture" style={{"display" :"block", "textAlign":"center", "margin-top":"30px", "margin-bottom":"0px",
          "horizontal-align":"center"}}>
              <img src={watermarks} alt= "Wildtrack logo" style= {{"width": "20%" }} />
              </div>
    <div className="Auth-form-container">
            <div className="signup-container" style={{"text-align":"center","background-color": "#348e47", "color": "white",  "width":"420px" , "height":"580px",  "padding-top":"115px","display": "inline-block","padding-bottom":"20px", "justify-content": "center", "vertical-align":"middle", "padding-top": "150px", }}>
        <h1 style={{ "font-size" :"24px", "padding-bottom": "20px"}}><b>Welcome Back!</b></h1>
        <h4 style={{"padding-bottom": "30px", "width": "75%", "margin": "auto", "line-height": "2.5"}}>To keep connected with us, please login in with your personal info</h4>
        <button className="link-primary" onClick={changeAuthMode} style={{"background-color": "#348e47", "color": "white", "padding-top": "15px","padding-bottom": "15px", "padding-left": "35px", "padding-right": "35px", "border":"2px solid white"}}>
                <b>Sign In</b>
              </button>

      </div>
      <form className="Auth-form" method="POST" action="/" style={{"line-height":"1.42857143", "height":"580px", "padding-top":"0px", "border-radius":"0px"}} >
        <div className="Auth-form-content" style={{"margin-bottom":"100px"}}>
          <h3 className="Auth-form-title" style={{"color":"#348e47", "margin-top":"10px", "margin-bottom": "10px"}}>Create Account</h3>

          <div className= "googlebutton" style={{"width":"75%", "margin": "auto"}}>
            <GoogleButton style={{"color":"black", "background-color": "white", "text-align":"center", "border":"0px solid 	#6495ed"}}/>
            </div>
            <div style={{"width":"100%", "margin": "auto", "text-align":"center"}}>
              <br/>
            <b >or use your email and password:</b>
            </div>
            <br/>
          <div  className="form-group mt-3" style={{"margin": "0px"}}>
          <div class="input-container" >
            <i class="fa fa-user icon" style={{"background-color":"white", "color":"#348e47"}}></i>
            <label></label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="First Name"
              required
            />
            </div>
          </div>
          <div className="form-group mt-3" style={{"margin": "0px"}}>
          <div class="input-container" >
          <i class="fa fa-user icon" style={{"background-color":"white", "color":"#348e47"}}></i>
            <label></label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="Last Name"
              required
            />
            </div>
          </div>
          <div className="form-group mt-3" style={{"margin": "0px"}}>
          <div class="input-container" style={{"margin-bottom":"15px"}}>
          <i class="fa fa-envelope icon" style={{"background-color":"white", "color":"#348e47"}}></i>
            <label></label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              required
              onChange={(e) => validateEmail2(e)}
            />
            </div>
           
          </div>
          {emailError2 === '' ? null : <span style={{
         "font-size":"10px"
        }}><b>{emailError2}</b></span>}
         
          <div className="form-group mt-3" style={{"margin-bottom":"0px"}}>
          <div class="input-container"style={{"margin-bottom":"0px"}} >
          <i class="fa fa-lock icon" style={{"background-color":"white", "color":"#348e47"}}></i>
          <input class="form-control mt-1"  style={{ "height":"38px" }}
                type={passwordShown ? "text" : "password"}
                onChange={(e) => validatePswd2(e)}
              
                placeholder="Password"
                required
              />
 <button style={{ "padding":"0px"}}onClick={togglePassword}><i class="fa fa-eye icon" style={{"color":"#348e47"}}></i></button>

             </div>
            </div>
            {pswdInvalid2 === '' ? null : <span style={{
          fontWeight: 'bold',
          color: 'black', 'font-size': '10px'
        }}>{pswdInvalid2}</span>}
        <br/>
          <div className="form-group mt-3" style={{ "display":"flex"}}>
          <input style={{"width": "5%", "text-align": "center", "margin": "auto", "height":"5%", "margin-right": "15px"}}
              type="checkbox"
              className="form-control mt-1"
              required
            />
            
            <label>Privacy Notice - I agree to the terms and conditions</label>
            
          </div>
          <div className="form-group mt-3" style={{"margin": "0px", "display":"flex"}}>
             <input style={{"width": "5%", "text-align": "center", "height":"5%","margin-right": "15px" }}
              type="checkbox"
              className="form-control mt-1"
            />
             <label>Send me to the WildTrack newsletter</label>
          </div>
          <div className="d-grid gap-2 mt-3" style={{"text-align": "center", "margin-top":"0px"}}>
            <button onClick={handleSubmit2} style={{"background-color":"#348e47","border":"2px solid white", "margin-top": "10px", "padding-top":"15px","padding-bottom":"15px", "padding-left": "30px",  "padding-right": "30px", }}  type="submit" className="btn btn-primary"> 
              Sign Up
            </button>
            
          </div>

        </div>
      </form>
    </div>
    </div>
    </div>
  )
}
