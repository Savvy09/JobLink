import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get('token') || null);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        Cookies.set('token', jwtToken, { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('user', JSON.stringify(userData), { expires: 1, secure: true, sameSite: 'strict' });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove('token');
        Cookies.remove('user');
    };

    const isAuthenticated = () => !!token;
    const isEmployer = () => user?.role === 'EMPLOYER';
    const isCandidate = () => user?.role === 'CANDIDATE';

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated,
            isEmployer,
            isCandidate
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);