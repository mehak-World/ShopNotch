import axios from "axios";

export const handleSubmit = async (e, setShowMsg, username, image, phone, address, setMsg) => {
    const token = localStorage.getItem("token")
    e.preventDefault();
    setShowMsg(true);

    // Create a new FormData object
    const formData = new FormData();

    // Append the username, image, phone, and address to the FormData object
    formData.append("username", username.current.value);
    formData.append("image", image.current.files[0]); // Use files[0] to get the first selected file
    formData.append("phone", phone);
    formData.append("address", address);

    console.log("Username:", username.current.value);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Selected file:", image.current.files[0]);

    try {
      // Send the form data to the server
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important to set this header for file uploads
          },
        }
      );

      console.log(response.data); // Log the response from the server

      if (response.data.success) {
        setMsg(response.data.message);
      }
    } catch (error) {
        setMsg("Could not upload data")
      console.error("Error uploading image:", error); // Log any errors
    }
  };