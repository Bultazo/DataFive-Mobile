import React, { createContext, useState } from 'react';
/**
 * This provider is created
 * to access user in whole app
 */
//Page ou sont enregistres les données de l'utilisateur une fois connecté dans l'application

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};







