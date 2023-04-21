import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import '../../assets/css/auth.css'

// bring in props, declare authContext and destructure
const Signin = (props) => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  // declare state and desstructure
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  useEffect(() => {
    // if user is signed in, go to homepage
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    // send err msg if user not recognized
    if (error === 'invalid credentials') {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // store user input on change
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // call login with user info on form submit
  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className='auth-container'>
    <h2 className='login-title'>Log in</h2>
    <form className='login-form' autocomplete='off' onSubmit={onSubmit}>
      <div>
        <label htmlFor='email'>Email </label>
        <input
               id='email'
               type='email'
               placeholder='me@example.com'
               onChange={onChange}
               required
               />
      </div>

      <div>
        <label htmlFor='password'>Password </label>
        <input
               id='password'
               type='password'
               placeholder='password'
               onChange={onChange}
               required
               />
      </div>

      <button className='btn btn--form' type='submit' name='action'>
        Log in
      </button>
    </form>
</div>
  );
};

export default Signin;
