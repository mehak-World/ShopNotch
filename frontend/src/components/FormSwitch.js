// src/components/FormSwitch.js
import React from 'react';

const FormSwitch = ({ isSignUpForm, handleSignUp, handleLogin }) => {
    return (
        <div className="text-center">
            {isSignUpForm ? (
                <p className="text-gray-300">
                    Continue to{" "}
                    <span className="text-red-500 text-xl italic font-bold">
                        <button onClick={(e) => {e.preventDefault(); handleLogin();}}>Login</button>
                    </span>
                </p>
            ) : (
                <p className="text-gray-300">
                    If you are a new user, continue to{" "}
                    <span className="text-red-500 text-xl italic font-bold">
                        <button onClick={(e) => {e.preventDefault(); handleSignUp();}}>Sign Up</button>
                    </span>
                </p>
            )}
        </div>
    );
};

export default FormSwitch;
