import { actionTypes } from '../actions/events'

const initialState = {
    events: [],
    activeEvent: {
        type: 'none',
        title: 'title',
        start: Date.now(),
        end: Date.now(),
        loc: {
            latitude: 0,
            logtitude: 0
        },
        desc: 'short desc',
        owner: 'anid'
    },
    eventFilter: {
        start: '',
        end: '',
        type: '',
        owner: ''
    }
}

export default user = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_EVENTS:
            return {...state, events: action.payload};
        case actionTypes.FETCH_EVENT: 
            return {...state, activeEvent: action.payload}
        case actionTypes.UPDATE_FILTER:
            return {...state, eventFilter: {...state.eventFilter, ...action.payload}}
        default: 
            return state;
    }
}