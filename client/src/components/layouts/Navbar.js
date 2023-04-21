import React, { Fragment, useContext, useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  // declare and destructure authcontext
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user,isAdmin,isAuthenticatedAdmin } = authContext;

  // logout user
  const onLogOut = () => {
    logout();
  };

  // fragment displays of user signed in
  const authLinks = (
    <Fragment>
      {isAdmin && !isAuthenticatedAdmin && (
        <li>
          <Link to='/admin'>Create Admin</Link>
        </li>
      )}
      <li>Hello, {user}!</li>
      <li onClick={onLogOut}>
        <Link to='/'>Sign Out</Link>
      </li>
      <li>
        <Link to='/'>Home</Link>
      </li>
    </Fragment>
  );

  // fragment displays if user is not signed in
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
    </Fragment>
  );

  return (
    // materializeCSS navbar
    <nav>
      <div className='nav-wrapper'>
        <a href='/' className='brand-logo left'>
          <i className='material-icons'>memory</i>
          Memory
        </a>
        {/* check if user signed in or not */}
        <ul id='nav-mobile' className='right'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
