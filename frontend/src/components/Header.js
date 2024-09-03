import React, {useState} from 'react'
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import { Link } from 'react-router-dom';


const Header = () => {
    const [active, setActive] = useState(null);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('')

    const handleLogout = async () => {
      const result = await logout();
      if (result.success) {
        navigate("/");
      } else {
        setErrorMsg(result.message);
      }
    };

  return (
   
    <div className = "flex justify-between bg-red-500 z-30 text-white w-full p-5 bg-opacity-65 shadow-lg" >
      
      {errorMsg && <Error errMsg = {errorMsg} />}
      <div>
        <h3 className = "text-2xl">ShopNotch</h3>
      </div>
      <div >
        <ul className = "flex gap-5">
          <Link to = "/browse"> <li className = "cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" style = {{textDecoration: active == "Home" ? "underline":"none"}}  onClick = {() => setActive("Home")}>Home</li></Link>
           
            <Link to = "/cart"><li className = "cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110   duration-300" style = {{textDecoration: active == "Cart"? "underline":"none", } } onClick = {() => setActive("Cart")}>Cart</li></Link>
            <li className = "cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300" style = {{textDecoration: active == "Contact" ? "underline":"none", }} onClick = {() => setActive("Contact")}>Contact</li>
            <Link to = "/account"> <li className = "cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300" style = {{textDecoration: active == "Account" ? "underline":"none", }} onClick = {() => setActive("Account")}>Account</li></Link>
           
            <button onClick = {handleLogout}>Logout</button>
           
        </ul>
      </div>
    </div>
  )
}

export default Header
