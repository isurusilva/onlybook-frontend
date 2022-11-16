import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import HttpService from '../HttpService';


const UserContext = createContext()


export function UserProvider({ children, user, setUser }) {
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      var token = localStorage.getItem('token') || null
      var decoded = jwt_decode(token)
      getUserId(decoded?.sub)
    }
  }, [])
  const getUserId = async (email) => {
    await HttpService
      .get(`/api/v1/users/getByEmail?email=${email}`)
      .then((res) => {
        let currentUser = res.data[0]
        localStorage.setItem("role", currentUser?.role);
        localStorage.setItem("userId", currentUser?.userID);
        setUser({
          userId: currentUser?.userID,
          role: currentUser?.role,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext