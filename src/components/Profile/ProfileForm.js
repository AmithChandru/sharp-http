import { useContext, useState } from 'react';
import DetailsContext from '../Store/DetailsContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const [newPassword, setNewPassword] = useState(null);
  const detailsCtx = useContext(DetailsContext);

  const handlePasswordChange = (e) => {
    e.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
      method: 'POST',
      body: {
        idToken: detailsCtx.details.idToken,
        password: newPassword,
        returnSecureToken: true
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          detailsCtx.addDetails(data);
        })
      } else {
        console.log(res, 'error');
      }
    })
  }

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' onChange={(e) => {setNewPassword(e.target.value)}} />
      </div>
      <div className={classes.action}>
        <button onClick={(e) => handlePasswordChange(e)}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
