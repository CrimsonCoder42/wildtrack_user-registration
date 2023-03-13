import React from "react";
import wildtracklogo from "./watermark.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  function logout() {
    navigate('/')
  }
    return ( 
      <nav class="navbar navbar-expand-lg navbar-light" min-height="60px" height="60px" style={{"background-color":"#4E342E", "margin-bottom": "0px", "display":"flex", "flex-direction": "row","flex-wrap": "nowrap", "justify-content": "space-between", "align-items": "center", "flex-flow":"row nowrap", }}>
    <div class="container-fluid" style={{"display":"flex", "justify-content":"space-between","flex-direction":"row","align-items":"center","width":"100%"}}>
      <div style={{"width":"50%","display":"flex","float":"left"}}>
    <a href="/">
    <img src={wildtracklogo} alt="" width="230" height="60" style={{"margin-top":10, "margin-bottom":10}}>
      </img>
      </a>
      </div>
      <div style={{"display":"flex","width":"50%","float":"right","flex-direction":"row-reverse"}}>
      <button onClick={logout} type="button" class="btn btn-default btn-sm">
          <span  style={{"text-align":"right"}}class="glyphicon glyphicon-log-out"></span> Log out
        </button>   
        </div>   
      </div>

  </nav>
   
);
}
export default Navbar