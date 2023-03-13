/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react"
import "bootstrap-icons/font/bootstrap-icons.css";
import validator from "validator"
import watermarks from "./watermark.png"
import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";




export default function ()  {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(window.location.search)
  const term = queryParams.get("code")



  var myHeaders = new Headers();
  myHeaders.append("content-type", "application/x-www-form-urlencoded");
  myHeaders.append("authorization", "Basic NGZxMTU4dWRocmptOTRlazk4dTRhOWZoaTI6MXFjOThpdDk2b3RqZnFzNjZzbXE5MDV2NGI3OTNhMnBmcTNrZ3U3NDg4a2trbWdxNDE0MQ==");

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("client_id", "4fq158udhrjm94ek98u4a9fhi2");
  urlencoded.append("code", queryParams.get("code"));
  urlencoded.append("redirect_uri", "https://localhost:3000/confirm_login/");
var token;
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("https://wildtrack-auth.auth.us-east-1.amazoncognito.com/oauth2/token", requestOptions)
    .then(response => response.json())
    .then(result => {
    token = result.access_token
    console.log(token)
     console.log(typeof result)
    sessionStorage.setItem("token",result.access_token)
    console.log("loginResponse", `sessionStorage set with token value: ${result.access_token}`)
    if(token === undefined) {
      navigate('/profile')
    } else{
      navigate('/profile')
    }}
    )
    .catch(error => console.log('error', error));  
  
    return (
      <div className="App">
        
      </div>
  )


}
