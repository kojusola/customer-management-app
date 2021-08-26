import { createSlice } from '@reduxjs/toolkit';
import { getAuthUser } from 'libs/auth';

const initialState = {
    authUser: getAuthUser() || null,
    showAddCustomer: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setAuthUser(state, action) {
            state.authUser = action.payload
        },
        toggleShowAddCustomer(state) {
            state.showAddCustomer = !state.showAddCustomer
        }

    }
})

export const { setAuthUser, toggleShowAddCustomer } = userSlice.actions;
export default userSlice.reducer