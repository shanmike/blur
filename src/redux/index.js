// ========== IMPORTS =============

import axios from "axios";

// ======= INITIAL STATE ==========

const initialState = {
  user: {}
};

// ======= ACTION TYPES ===========

const GET_USER = "GET_USER";
const _FULFILLED = "_FULFILLED";
const UPDATE_USER = "UPDATE_USER";

// ====== ACTION CREATORS =========
export function getUser() {
  const userData = axios.get("/auth/me").then(res => res.data);
  return {
    type: GET_USER,
    payload: userData
  };
}

export function updateUser(updates) {
  const userUpdate = axios.put("/updateUser", updates).then(res => res.data);
  return {
    type: UPDATE_USER,
    payload: userUpdate
  };
}

// =========== REDUCER ===========
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER + _FULFILLED:
      return Object.assign({}, state, { user: action.payload });

    case UPDATE_USER + _FULFILLED:
      return Object.assign({}, state, { user: action.payload });

    default:
      return state;
  }
}
