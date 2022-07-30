import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }

    const handleToggle = () => {
        setVisible(!visible)
    }


    return (
        <div className="blog" style ={blogStyle}>
            {blog.title} {blog.author} <button  onClick={handleToggle}>{visible ? 'hide' : 'view'}</button>
            {/* detail */}
            <div className="blogDetail" style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>likes: {blog.likes} <button  onClick={() => handleLike(blog)}>like</button> </div>
                <div>{blog.author}</div>
                <button  onClick={() => handleRemove(blog)}>remove</button>
            </div>

        </div>
    )
}

export default Blog