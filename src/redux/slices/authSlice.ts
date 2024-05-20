import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    email: string | null;
    username: string | null;
    userId: string | null;
}
  
const initialState: AuthState = {
    isLoggedIn: false,
    email: null,
    username: null,
    userId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      SET_ACTIVE_USER: (state, action: PayloadAction<AuthState>) => {
        console.log(action.payload);
        const { isLoggedIn, email, userId } = action.payload;

        state.isLoggedIn = isLoggedIn
        state.email = email
        state.userId = userId
      },

      REMOVE_ACTIVE_USER: (state) => {
        state.isLoggedIn = false
        state.email = null
        state.userId = null
        console.log(state.isLoggedIn);
        
      },
    },
  });


export const {
    SET_ACTIVE_USER,
    REMOVE_ACTIVE_USER
} = authSlice.actions;

export const getIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export const getEmail = (state: { auth: AuthState }) => state.auth.email;
export const getUsername = (state: { auth: AuthState }) => state.auth.username;
export const getUserId = (state: { auth: AuthState }) => state.auth.userId;


export default authSlice.reducer;