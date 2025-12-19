import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isLoggedIn = true;
        },
        logOut(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
    },
})

const userReducer = userSlice.reducer;

export const { setCredentials, logOut, setUser, clearUser } = userSlice.actions;

export default userReducer;