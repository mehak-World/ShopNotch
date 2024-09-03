// src/components/FormInput.js
import React from 'react';

const FormInput = ({ type, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-64 rounded-lg p-4 h-11 mb-5 text-black"
        />
    );
};

export default FormInput;
