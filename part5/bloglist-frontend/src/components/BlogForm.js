import Togglable from './Togglable'
import { useState } from 'react'


const BlogForm = ({ handleCreate }) => {

    const [newBlog, setNewBlog] = useState({ title: '', author: '', url:'' })

    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreate(newBlog)
    }

    return (
        <div>
            <Togglable buttonLabel="new blog">
                <h2>create new</h2>
                <form onSubmit={handleSubmit}>
                    <div>title: <input id='title-input' type="text" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/></div>
                    <div>author: <input id='author-input' type="text" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/></div>
                    <div>url: <input id='url-input' type="text" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/></div>
                    <button id="create-button" type='submit'>create</button>
                </form>
            </Togglable>
        </div>
    )
}

export default BlogForm