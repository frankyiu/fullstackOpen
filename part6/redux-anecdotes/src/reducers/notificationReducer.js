import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutId = '' 
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        setMessage(state, action) {
            return action.payload 
        },
        resetMessage(state, action) {
            return ""
        }
    }
})

export const setNotification = (message, timeout) =>{
    return dispatch => {
        if(timeoutId)
            clearTimeout(timeoutId)
        dispatch(setMessage(message))
        timeoutId = setTimeout(()=>{dispatch(resetMessage())} , timeout* 1000)
    }
}

export const {setMessage, resetMessage} = notificationSlice.actions

export default notificationSlice.reducer