import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
}

interface IUser {
      email: any
      photoURL: any
      displayName: any
      uid: any
}

const loggedInSlice = createSlice(
  {
    name: 'logged',
    initialState,
    reducers:{
      logInInReducer(state, action){
        const stateLoggedIn = {...state, user: action.payload}
        return stateLoggedIn
      },
      logOutInReducer(){
        return {user: null}
      }
    }
  }
)


export default loggedInSlice.reducer

export const {logInInReducer, logOutInReducer} = loggedInSlice.actions