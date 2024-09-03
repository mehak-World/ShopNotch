import React, {useRef, useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const username = useRef('');
    const navigate= useNavigate();
    const password = useRef('');
    const [msg, setMsg] = useState('')
    const [showMsg, setShowMsg] = useState(false)

    const submitHandler = async (e) => {
            e.preventDefault();
            setShowMsg(true)
            const response = await axios.post("http://localhost:8080/admin", {username: username.current.value, password: password.current.value})
            console.log(response);
            if(response.data.success){
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
            }
            else{
                
                setMsg("Could not log in. Incorrect username or password")
            }
           
    }

    const closeMsg = () => {
        setShowMsg(false)
    }
    
  return (
    <>
    
        <img
    alt="background-image"
    className="absolute inset-0 w-full h-full object-cover z-0"
    src="https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg"
/>
    <div className = "m-4 bg-slate-950 max-w-96 p-4 text-white rounded-lg mx-auto relative my-52">
    {showMsg && <div className = "p-2 flex justify-between text-black bg-yellow-50 rounded-lg">
        {msg}
        <button onClick = {closeMsg}>X</button>
    </div>}
      <h2 className = "font-bold text-2xl my-8"> Admin Login</h2>
      <form onSubmit = {submitHandler}>
        <div className = "flex gap-3 align-middle my-3">
                <label for = "username">Username: </label>
                <input ref = {username} type = "text" name = "username" id = "username" className = "text-black p-1 w-[300px] border border-black rounded-lg"/>
        </div>

        <div className = "flex gap-3 align-middle my-3">
                <label for = "password">Password: </label>
                <input ref = {password} type = "text" name = "password" id = "password" className = "text-black p-1 w-[300px] border border-black rounded-lg"/>
        </div>
        
        <button className = "text-black bg-white p-2 rounded-lg">Login</button>
      </form>
    </div>
    </>

  )
}

export default Login
