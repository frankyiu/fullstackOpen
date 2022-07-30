import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [user, setUser] = useState(null)


    const [notification, setNotifiaction] = useState(null)

    useEffect(() => {
        refresh()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    },[])

    const refresh = () => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setNotifiaction({ message: 'Wrong credentials', type : 'alert' } )
            setTimeout(() => {setNotifiaction(null)}, 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedUser')
    }

    const handleCreate =  async (newBlog) => {
        console.log('create', newBlog)
        try {
            await blogService.create(newBlog)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )
            setNotifiaction({ message: `a new blog ${newBlog.title} by ${newBlog.author}`, type : 'info' } )
            setTimeout(() => {
                setNotifiaction(null)
            }, 5000)
        } catch (error) {
            setNotifiaction({ message: 'Wrong credentials', type : 'alert' } )
            setTimeout(() => {
                setNotifiaction(null)
            }, 5000)
        }
    }

    const handleLike = async (blog) => {
        const object = {
            user: blog.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        await blogService.update(blog.id, object)
        refresh()
    }

    const handleRemove = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            await blogService.remove(blog.id)
            refresh()
        }
    }

    const loginForm = () => (
        <div>
            <h2>log in to the application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id="username-input"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )

    const blogForm = () => (
        <div>
            <h2>blogs</h2>
            <div>
                {user.name} logged in <button onClick={handleLogout}>logout</button>
            </div>
            <br></br>
            <BlogForm handleCreate={handleCreate}/>

            {blogs
                .sort((a,b) => (b.likes - a.likes))
                .map((blog) =>
                    <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
                )}
        </div>
    )


    return (
        <div>
            <Notification notification ={notification}/>
            {user === null && loginForm()}
            {user !== null && blogForm()}
        </div>
    )
}

export default App
