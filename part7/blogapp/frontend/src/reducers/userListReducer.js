import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const initialState = []

const userListSlice = createSlice({
    name: 'userLust',
    initialState,
    reducers: {
        setUserList(state, action) {
            return action.payload
        },
    },
})

export const getAllUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch(setUserList(users))
    }
}

export const { setUserList } = userListSlice.actions

export default userListSlice.reducer
