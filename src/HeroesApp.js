import React, { useEffect, useReducer } from 'react';
import { AppRouter } from './routers/AppRouter';
import { AuthContext } from './Auth/AuthContext';
import { authReducer } from './Auth/authReducer';

const init = () => {
    return JSON.parse(localStorage.getItem("user")) || {
        logged: false
    }
}

export const HeroesApp = () => {

    
    const [user, dispatch] = useReducer(authReducer, {}, init);
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (

        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>

    )
}
