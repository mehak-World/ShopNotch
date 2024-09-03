

export const validateData = (phone_number) => {
    const isPhoneValid = /^\+[1-9]{1}[0-9]{3,14}$/
.test(phone_number);

if(!isPhoneValid){
    return "Phone Number is not valid"
}

return null;


}