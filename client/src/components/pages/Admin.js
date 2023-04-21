import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

// bring in props
const Admin = (props) => {
  // declare and destructure authContext
  const authContext = useContext(AuthContext);

  const { createAdmin, error, clearErrors, isAuthenticatedAdmin } = authContext;

  // declare and destructure component level state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  // if user is signed in, go to homepage
  useEffect(() => {
    if (isAuthenticatedAdmin) {
      props.history.push('/dashboard');
    }

    // if errors, alert user and clear errors
    if (error === 'Email already exists') {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticatedAdmin, props.history]);

  // store user input on change
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // register user with input object on form submit
  const onSubmit = (e) => {
    e.preventDefault();
    createAdmin({
      name,
      email,
      password,
    });
  };

  return (
    <div className='auth-container'>
    <h2 className='login-title'>Create Admin</h2>
    <form className='login-form' autocomplete='off' onSubmit={onSubmit}>
    <div>
        <label htmlFor='name'>Name </label>
        <input
               id='name'
               type='text'
               placeholder='Eren Buruk'
               onChange={onChange}
               required
               />
      </div>
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
        Add Admin
      </button>
    </form>
</div>
  );
};

export default Admin;
