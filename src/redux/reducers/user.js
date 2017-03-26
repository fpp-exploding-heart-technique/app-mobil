import { actionTypes } from '../actions/user'

const initialState = {
    name: 'username',
    id: 'burak0',
    email: 'email',
    picUrl: 'url',
    loggedIn: false,
}

export default user = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            console.log(action.payload);
            return {...state, loggedIn: true, ...action.payload};
        case actionTypes.LOGOUT:
            return {...state, loggedIn: false};
        default: 
            return state;
    }
}