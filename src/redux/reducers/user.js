import { actionTypes } from '../actions/user'

const initialState = {

}

export default user = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            console.log('login approved');
            return state;
        default: 
            return state;
    }
}