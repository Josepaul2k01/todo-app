// src/services/authService.js

export const login = (username, password) => {
    const authToken = btoa(`${username}:${password}`); // Encode the username and password
    if (authToken === btoa('admin:password')) { // Example check against hardcoded credentials
        localStorage.setItem('authToken', authToken); // Store the token in localStorage
        return true;
    }
    return false;
};

export const isAuthenticated = () => {
    const authToken = localStorage.getItem('authToken');
    return authToken === btoa('admin:password'); // Check if the stored token matches the expected one
};

export const logout = () => {
    localStorage.removeItem('authToken');
};

export const getAuthHeader = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        return {
            'Authorization': `Basic ${authToken}`
        };
    }
    return {};
};
