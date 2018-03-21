import axios from 'axios';

const initialState = {
      user:{}
}

const GET_USER = "GET_USER";
const _FULFILLED = "_FULFILLED";
const UPDATE_USER = "UPDATE_USER"

export function getUser(){
    let userData = axios.get('/auth/me').then(res => {
        // console.log(res.data)
        return res.data
    })
    return{
          type: GET_USER
        , payload: userData
    }
}

export function updateUser(updates){
    let userUpdate = axios.put('/updateUser', updates).then(res=>{
        return res.data
    })
    return{
          type:UPDATE_USER
        , payload: userUpdate
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_USER + _FULFILLED:
            return Object.assign({}, state, {user:action.payload})
        case UPDATE_USER +_FULFILLED:
            return Object.assign({}, state, {user:action.payload})
        default: 
            return state;
    }
}