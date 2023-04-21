import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  ADMIN_REG_SUCCESS,
  ADMIN_REG_FAIL,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL

} from '../types';

const AuthState = (props) => {
  // declare inicial state
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isAdmin: false,
    loading: true,
    user: null,
    error: null,
    isAuthenticatedAdmin:false,
    usersData: []
  };

  // declare state/dispatch with useReducer hook
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    // check localstorage has a token, setAUthToken if so
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // declare response from backend, dispatch data to USER_LOADED

  };

  // Register User
  const register = async (formData) => {
    // declare config variable with header
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    // declare response from backend, post user data
    try {
      const res = await axios.post('/user/register', formData, config);
      // dispatch data to reducer
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // load user
      loadUser();
      // dispatch error if found
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  //Create Admin
  const createAdmin = async (formData) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    // declare response from backend, post user data
    try {
      const res = await axios.post('/admin/createadmin', formData, config);
      // dispatch data to reducer
      dispatch({
        type: ADMIN_REG_SUCCESS,
        payload: res.data,
      });
      // load user
      loadUser();
      // dispatch error if found
    } catch (error) {
      dispatch({
        type: ADMIN_REG_FAIL,
        payload: error.response.data.msg,
      });
    }
  }

  //Get All Users Data (Only Admin can access this route)
  const getAllUsers = async () => {
    // declare response from backend, dispatch to reducer
    try {
      const res = await axios.get('/admin/getresults');
      dispatch({
        type: GET_ALL_USER_SUCCESS,
        payload: res.data,
      });
      // dispatch errr msg if found
    } catch (error) {
      dispatch({
        type: GET_ALL_USER_FAIL,
        payload: error.response.msg,
      });
    }
  };
  // Login User
  const login = async (formData) => {
    // declare config variable with header
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    // declare response from post, dispatch to reducer
    try {
      const res = await axios.post('/user/login', formData, config);
      console.log(res.data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
      // dispatch error if found
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    // return all variables and functions to provider
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAuthenticatedAdmin:state.isAuthenticatedAdmin,
        loading: state.loading,
        user: state.user,
        error: state.error,
        isAdmin: state.isAdmin,
        usersData: state.usersData,
        register,
        createAdmin,
        getAllUsers,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
