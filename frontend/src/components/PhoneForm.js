import React, {useEffect} from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import useAccessUser from '../utils/useAccessUser';

function PhoneNumberForm({ phone, setPhone }) {
    const user = useAccessUser()

    useEffect(() => {
        if(user?.phone_no){
            setPhone(user.phone_no)
        }
    }, [user])


  return (
    <div>
      <h3>Enter your phone number:</h3>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        inputStyle={{ width: '100%' }}
      />
    </div>
  );
}

export default PhoneNumberForm;
