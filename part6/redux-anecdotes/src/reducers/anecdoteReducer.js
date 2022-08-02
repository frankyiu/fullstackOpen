import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    // voteAnecdote(state, action) {
    //   return state.map(x => x.id !== action.payload? x: {...x, votes: x.votes+1})
    // },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(x => x.id !== action.payload.id? x : action.payload)
    }
  }
})

export const initializeAnecdote = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(setAnecdote(anecdotes))  
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(asObject(content))
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const anecdote = await anecdoteService.vote(id)
    dispatch(updateAnecdote(anecdote))
  }
}

export const { updateAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer