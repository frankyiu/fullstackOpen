import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        resetMessage() {
            return null
        },
    },
})

export const setNotification = (payload, timeout) => {
    return async (dispatch) => {
        dispatch(setMessage(payload))
        setTimeout(() => {
            dispatch(resetMessage())
        }, timeout)
    }
}

export const { setMessage, resetMessage } = notificationSlice.actions

export default notificationSlice.reducer
