import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import '../../assets/css/auth.css'

// bring in props
const Register = (props) => {
  // declare and destructure authContext
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  // declare and destructure component level state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  // if user is signed in, go to homepage
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    // if errors, alert user and clear errors
    if (error === 'Email already exists') {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  // store user input on change
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // register user with input object on form submit
  const onSubmit = (e) => {
    e.preventDefault();
    register({
      name,
      email,
      password,
    });
  };

  return (
<div className='auth-container'>
    <h2 className='login-title'>Sign Up</h2>
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
        Register
      </button>
    </form>
</div>
  );
};

export default Register;
