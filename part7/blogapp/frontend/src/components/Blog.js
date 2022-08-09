// import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {
    toLikeBlog,
    toRemoveBlog,
    toCommentBlog,
} from '../reducers/blogReducer'
const Blog = ({ blog, user }) => {
    if (!blog) return <></>

    const dispatch = useDispatch()
    const naviage = useNavigate()
    const [comment, setComment] = useState('')
    const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
    const own = blog.user && user.username === blog.user.username

    const likeBlog = () => {
        const liked = {
            ...blog,
            likes: (blog.likes || 0) + 1,
            user: blog.user.id,
        }
        dispatch(toLikeBlog(blog.id, liked))
    }

    const removeBlog = () => {
        const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)

        if (!ok) {
            return
        }
        dispatch(toRemoveBlog(blog.id))
        naviage('/')
    }

    const addComment = (event) => {
        console.log(comment)
        event.preventDefault()
        dispatch(toCommentBlog(blog.id, comment))
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes{' '}
                <Button size="sm" onClick={() => likeBlog()}>
                    like
                </Button>
            </div>
            added by {addedBy}{' '}
            {own && (
                <Button size="sm" onClick={() => removeBlog()}>
                    remove
                </Button>
            )}
            <h3>comments</h3>
            <Form onSubmit={addComment}>
                <Form.Control
                    className="mb-3"
                    type={'text'}
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                <Button size="sm" type="submit">
                    add comment{' '}
                </Button>
            </Form>
            <ul>
                {blog.comments.map((comment, id) => (
                    <li key={id}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

// Blog.propTypes = {
//     blog: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         author: PropTypes.string.isRequired,
//         url: PropTypes.string.isRequired,
//         likes: PropTypes.number.isRequired,
//         user: PropTypes.shape({
//             username: PropTypes.string.isRequired,
//             name: PropTypes.string.isRequired,
//         }),
//     }).isRequired,
//     user: PropTypes.shape({
//         username: PropTypes.string.isRequired,
//     }),
// }

export default Blog
