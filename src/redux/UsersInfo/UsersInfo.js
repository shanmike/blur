// import axios from 'axios'

// const initialState = {
//         usersList:[]
//       , profile:{}
// }

// const GET_LOCAL_USERS = 'GET_LOCAL_USERS';
// const GET_PROFILE = 'GET_PROFILE'
// const UPDATE_PROFILE = 'UPDATE_PROFILE'

// export function getLocalUsers(){
//     const localUsers = axios.get('/getLocalUsers').then(res=>{
//         console.log('getLocalUsers-redux',res.data)
//         return res.data
//     })
//     return{
//           type: GET_LOCAL_USERS
//         , payload: localUsers
//     }
// }

// export function getProfile(){
//     const getProfile = axios.get('/getProfile').then(res=>{
//         console.log('getProfile-redux',res.data)
//         return res.data
//     })
//     return{
//           type: GET_PROFILE
//         , payload: getProfile
//     }
// }

// export function updateProfile(){
//     const updateProfile = axios.put('/updateProfile/:user_id').then(res=>{
//         consle.log('updateProfile-redux', res.data)
//         return res.data
//     })
//     return{
//           type: UPDATE_PROFILE
//         , payload: updateProfile
//     }
// }

// export default function reducer(state = initialState, action){
//     switch (action.type) {
//         case GET_LOCAL_USERS:
//             return Object.assign({}, state, {userList:action.payload})
//         case GET_PROFILE:
//             return Object.assign({}, state, {profile:action.payload})
//         case UPDATE_PROFILE:
//             return Object.assign({}, state, {profile:action.payload})
//         default:
//             return state
//     }
// }