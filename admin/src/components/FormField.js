import React from 'react';

const FormField = ({ label, inputType = 'text', inputRef, name }) => (
  <div className="flex gap-5 my-4 justify-between">
    <label htmlFor={name} className="font-bold">{label}</label>
    <input
      type={inputType}
      ref={inputRef}
      name={name}
      id={name}
      className="w-[300px] border border-black rounded-lg p-2"
    />
  </div>
);

export default FormField;
