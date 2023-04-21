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

// authReducer returns object state based on the type passed in using a switch
const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case ADMIN_REG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticatedAdmin:true,
        loading: false,

      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isAuthenticatedAdmin:false,
        loading: false,
        user: action.payload.name,
        loading: false,
        isAdmin: action.payload.isAdmin ? true : false
      };
      case GET_ALL_USER_SUCCESS:
        return {
          ...state,
          usersData: action.payload,
        };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case ADMIN_REG_FAIL:
    case GET_ALL_USER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        isAdmin:false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
