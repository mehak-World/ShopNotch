// src/components/FormHeader.js
import React from 'react';

const FormHeader = ({ isSignUpForm }) => {
    return (
        <h2 className="text-white font-bold text-3xl text-center mb-7">
            {isSignUpForm ? "SignUp Form" : "Login Form"}
        </h2>
    );
};

export default FormHeader;
