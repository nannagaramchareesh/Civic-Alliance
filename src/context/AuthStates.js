    import React, { useState, useEffect } from 'react';
    import AuthContext from './AuthContext';

    export default function AuthStates(props) {
        const [user, setUser] = useState(() => {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        });

        const [department,setDepartment] = useState(() => {
            return localStorage.getItem("department") || null;
        }
            
            );

        const [token, setToken] = useState(() => {
            return localStorage.getItem("authToken") || null;
        });

        useEffect(() => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("authToken");

            if (storedUser) setUser(JSON.parse(storedUser));
            if (storedToken) setToken(storedToken);
        }, []);

        const login = (userData, authToken) => {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("authToken", authToken);
            localStorage.setItem('department',userData.department)
            setDepartment(userData.department)
            setUser(userData);
            setToken(authToken);
        };

        const logout = () => {
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
            setUser(null);
            setToken(null);
        };

        return (
            <AuthContext.Provider value={{ user, login, logout, token, setToken ,department}}>
                {props.children}
            </AuthContext.Provider>
        );
    }
