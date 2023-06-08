import React, { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import '../../assets/css/navbar.css'

const Navbar = () => {
  // declare and destructure authcontext
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, isAdmin, isAuthenticatedAdmin } = authContext;

  // logout user
  const onLogOut = () => {
    logout();
  };

  // get current location
  const location = useLocation();

  // fragment displays of user signed in
  const authLinks = (
    <Fragment>
      {isAdmin && !isAuthenticatedAdmin && (
        <li className={location.pathname === '/admin' ? 'active' : ''}>
          <Link to='/admin'>Create Admin</Link>
        </li>
      )}
      {isAdmin && (
        <li className={location.pathname === '/result' ? 'active' : ''}>
          <Link to='/result'>Results</Link>
        </li>
      )}
      <li onClick={onLogOut}>
        <Link to='/'>Sign Out</Link>
      </li>
    </Fragment>
  );

  // fragment displays if user is not signed in
  const guestLinks = (
    <Fragment>
      <li className={location.pathname === '/' ? 'active' : ''}>
        <Link to='/'>Home</Link>
      </li>
      <li className={location.pathname === '/register' ? 'active' : ''}>
        <Link to='/register'>Register</Link>
      </li>
      <li className={location.pathname === '/signin' ? 'active' : ''}>
        <Link to='/signin'>Sign In</Link>
      </li>
    </Fragment>
  );

  return (
    // materializeCSS navbar
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo left'>
          <i className='material-icons'>memory</i>
          {isAuthenticated && user ? user : 'Card Matching Game'}
        </Link>
        {/* check if user signed in or not */}
        <ul id='nav-mobile' className='right'>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
