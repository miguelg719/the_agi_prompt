
// Function to set the authentication token in local storage
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

// Function to get the authentication token from local storage
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Function to remove the authentication token from local storage
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token; // Returns true if token exists, false otherwise
};

// Function to decode the JWT token (if you're using JWT)
export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Function to check if the token is expired
export const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) return true;
  
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

// Function to get user info from the token
export const getUserInfo = () => {
  const token = getAuthToken();
  if (!token) return null;
  
  const decodedToken = decodeToken(token);
  return decodedToken ? { userId: decodedToken.userId, username: decodedToken.username } : null;
};

// Function to create Authorization header
export const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};