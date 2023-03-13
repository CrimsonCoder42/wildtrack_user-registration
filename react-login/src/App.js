import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import ProfilePage from './ProfilePage';
import ConfirmLogin from './ConfirmLogin';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/confirm_login"  element={<ConfirmLogin />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;
