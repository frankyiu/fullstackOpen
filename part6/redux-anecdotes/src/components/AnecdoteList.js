import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdote = useSelector(state => {
      if(state.filter !== ""){
        return state.anecdote.filter(x => x.content.includes(state.filter))
      }
      return state.anecdote
    })
    const dispatch = useDispatch()
    
    const vote = (id, content) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
      dispatch(setNotification(`you voted '${content}'`, 5))
    }

    return (
        <>
        {anecdote
            .slice()
            .sort( (a,b) => (b.votes - a.votes))
            .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
              </div>
            )}
        </>
    )
}

export default AnecdoteList