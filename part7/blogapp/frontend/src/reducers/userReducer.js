import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        resetUser() {
            return null
        },
    },
})

export const toResetUser = () => {
    return async (dispatch) => {
        userService.clearUser()
        dispatch(resetUser())
    }
}

export const toSetUser = (user) => {
    return async (dispatch) => {
        userService.setUser(user)
        dispatch(setUser(user))
    }
}

export const getUser = () => {
    return async (dispatch) => {
        const userFromStorage = userService.getUser()
        if (userFromStorage) dispatch(setUser(userFromStorage))
    }
}
export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
