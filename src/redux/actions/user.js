import axios from 'axios'

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
export const fetchUser = (id, email, callback) => {
    return (dispatch, getState) => {}
}

export const login = (token, userId, callback) => {

    return (dispatch, getState) => {
        axios({
            url: 'https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token,
            method: 'get'
        }).then(res => {
            // backend user register
            axios({
                url: 'https://hermes-hackathon.herokuapp.com/users/checkin',
                method: 'post',
                data: {
                    facebook: userId,
                    name: res.data.name
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });

            dispatch({
                type: actionTypes.LOGIN,
                payload: {
                    id: userId,
                    name: res.data.name,
                    email: res.data.email,
                    picUrl: 'http://graph.facebook.com/' + userId + '/picture?type=large'
                }
            });
        }).catch(err => {
            console.log(err);
        });

    }

}

// ----- LOGOUT -----
export const logout = (callback) => {
    return {type: actionTypes.LOGOUT};
}

export const signup = (email, password, name, callback) => {
    return (dispatch, getState) => {}
}