import { useState, useRef, useContext } from 'react';
import DetailsContext from '../Store/DetailsContext';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const detailsCtx = useContext(DetailsContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setLoading(true);

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.ok) {
          console.log(res);
          detailsCtx.addDetails(res);
        } else {
          return res.json().then((data) => {
            console.log(data, 'error');
          })
        }
      })
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if(res.ok) {
          console(res);
        } else {
          return res.json().then((data) => {
            alert(data.error.message);
          })
        }
      })
    }
    setLoading(false);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {loading && <p style={{color: 'white', fontSize: '20px'}}>Sending Request...</p>}
        <div className={classes.actions}>
          <button type='submit'>
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
