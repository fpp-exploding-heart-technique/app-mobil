import axios from 'axios'


export const actionTypes = {
    FETCH_EVENTS: 'FETCH_EVENTS',
    FETCH_EVENT: 'FETCH_EVENT',
    UPDATE_FILTER: 'UPDATE_FILTER'

};



export const fetchEvents = () => {
    return (dispatch, getState) => {
        let url = 'https://hermes-hackathon.herokuapp.com/events';
        filter = getState.filter;
        if (filter) {
            url += '&start=' + filter.start;
            url += '&end=' + filter.end;
            url += '&type=' + filter.type;
            url += '&owner=' + filter.owner;
        }

        axios({
            url,
            method: 'get'
        })
        .then((res) => {
            dispatch({type: actionTypes.FETCH_EVENTS, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const fetchEvent = (id, cb) => {
    return (dispatch, getState) => {   
        axios({
            url: 'https://hermes-hackathon.herokuapp.com/events/' + id,
            method: 'get'
        })
        .then((res) => {
            console.log(res);
            cb(res.data.location);
            dispatch({type: actionTypes.FETCH_EVENT, payload: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const createEvent = (data, cb) => {
    return (dispatch, getState) => {

        axios({
            url: 'https://hermes-hackathon.herokuapp.com/events',
            method: 'post',
            data: data
        })
        .then(res => {
            cb(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
}


export const updateFilter = (filter) => {
    return {type: actionTypes.UPDATE_FILTER, payload:{...filter} }
}