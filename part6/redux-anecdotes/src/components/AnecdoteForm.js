import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
const AnecodeForm = (props)=>{

    const create = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )

}

  
const mapDispatchToProps = {
    createAnecdote,
}
  
const ConnectedAnecodeForm = connect(null,mapDispatchToProps)(AnecodeForm)
export default ConnectedAnecodeForm