export const actionTypes = {
    INIT: 'INIT',
    
    LOGIN: 'LOGIN',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    FETCH_USER: 'FETCH_USER',

    LOGOUT: 'LOGOUT',
    LOGOUT_FAIL: 'LOGOUT_FAIL',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

    SIGNUP: 'SIGNUP',
    SIGNUP_FAIL: 'SIGNUP_FAIL',
    SIGNUP_SUCCESS: 'SIGNUP_FAIL' 
};


// ----- LOGIN -----
const fetchUser = (id, email, callback) => {
    return (dispatch, getState) => {
        
    }
}

export const login = (email, password, callback) => {
   
    return (dispatch, getState) => {
       
    }

    
}

// ----- LOGOUT -----
export const logout = (callback) => {
    return (dispatch, getState) => {
        
    }
}

export const signup = (email, password, name, callback) => {
    return (dispatch, getState) => {
        
    }
} 