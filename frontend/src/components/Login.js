import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../utils/auth';
import Error from './Error';
import FormInput from './FormInput';
import FormHeader from './FormHeader';
import FormSwitch from './FormSwitch';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        setIsSignUpForm(true);
    };

    const handleLogin = () => {
        setIsSignUpForm(false);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        if (isSignUpForm) {
            const result = await signup(username, password);
            if (result.success) {
                navigate("/browse");
            } else {
                setErrorMsg(result.message);
            }
        } else {
            const result = await login(username, password);
            if (result.success) {
                navigate("/browse");
            } else {
                setErrorMsg(result.message);
            }
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/auth/google";
    };

    return (
        <>
            <img
                alt="background-image"
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="https://static.vecteezy.com/system/resources/previews/001/738/733/large_2x/e-commerce-design-with-white-square-gift-box-on-pink-background-free-photo.jpg"
            />
            <div className="w-3/12 gap-3 bg-black absolute top-48 left-2/4 rounded-lg z-30 text-white p-3 bg-opacity-70">
                {errorMsg && <Error errMsg={errorMsg} />}
                <form>
                    <FormHeader isSignUpForm = {isSignUpForm} />
                    <div className="flex gap-3 align-middle justify-center">
                        <FormInput
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 align-middle justify-center">
                        <FormInput
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            className="p-2 bg-red-500 text-white text-xl rounded-lg mb-7 w-64"
                            onClick={handleClick}
                        >
                            {isSignUpForm ? "SignUp" : "Login"}
                        </button>
                        <h2 className = "mb-2">OR</h2>
                        <button
                            type="button"
                            className="p-2 bg-blue-500 text-white text-xl rounded-lg mb-7 w-64"
                            onClick={handleGoogleLogin}
                        >
                           
                            Continue with Google
                        </button>
                        <FormSwitch
                            isSignUpForm={isSignUpForm}
                            handleSignUp={handleSignUp}
                            handleLogin={handleLogin}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
