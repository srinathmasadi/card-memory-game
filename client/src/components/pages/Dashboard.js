import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';


const Dashboard = () => {
    // declare authContext, and destructure authContext
    const authContext = useContext(AuthContext);

    const {usersData,getAllUsers} = authContext;

    useEffect(()=>{
        getAllUsers()
    },[]);

  return (
    console.log("User's data", usersData),
    <div>Dashboard</div>
  )
}

export default Dashboard