import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import useAccessUser from "../utils/useAccessUser";
import AddressForm from "./AddressForm";
import PhoneNumberForm from "./PhoneForm";
import useImage from "../utils/useImage";
import ImageForm from "./ImageForm";
import { handleSubmit } from "../utils/accountUtilities";

const Account = () => {
  const token = localStorage.getItem("token");
  const image = useRef(null);
  const username = useRef(null);
  const [msg, setMsg] = useState("");
  const [showMsg, setShowMsg] = useState(true);
  const [address, setAddress] = useState(''); // State for address
  const [phone, setPhone] = useState(''); // State for phone number
  const [imageUrl, setImageUrl] = useState(null)

  const user = useAccessUser();



  function previewImage(event) {
    const reader = new FileReader();
    console.log(reader);
    reader.onload = function () {
      const output = document.getElementById("imagePreview");
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  const closeMsg = () => {
    setShowMsg(false);
  };

  useImage(setImageUrl)

  return (
    <div className="w-[500px] mx-auto relative my-20 p-3">
      {showMsg && msg && (
        <div className="flex justify-between bg-red-200 p-2 rounded-lg">
          <p>{msg}</p>
          <button onClick={closeMsg}>X</button>
        </div>
      )}

      <h2 className="text-gray-600 font-bold text-xl my-3">My Account</h2>
      <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e, setShowMsg, username, image, phone, address, setMsg)}>
        <div className="flex justify-between align-middle">
          <label className="font-bold mt-2">Username</label>
          <input
            type="text"
            ref={username}
            name="name"
            defaultValue={user?.username}
            className="p-2 rounded-lg outline-gray-600 w-80"
          />
        </div>

        <ImageForm image = {image} imageUrl={imageUrl} previewImage={previewImage} />

        {/* Pass state and setter functions as props */}
        <AddressForm address={address} setAddress={setAddress} />
        <PhoneNumberForm phone={phone} setPhone={setPhone} />

        <button className="bg-red-300 p-2 rounded-lg mt-3">Submit</button>
      </form>
    </div>
  );
};

export default Account;
