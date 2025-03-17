import React from 'react'
import AuthContext from './AuthContext';
import {useState} from 'react';
import {useEffect} from 'react';
export default function AuthStates(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // 🔥 Update user state immediately
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        setUser(null);
    };
  return (
    <div>
      <AuthContext.Provider value={{user,login,logout}}>
      {props.children}
    </AuthContext.Provider>
    </div>
  )
}
