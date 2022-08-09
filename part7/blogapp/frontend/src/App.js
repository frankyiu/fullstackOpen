import { useEffect, useRef } from 'react'

import { Routes, Route, useMatch } from 'react-router-dom'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
// import blogService from './services/blogs'
import loginService from './services/login'
// import userService from './services/user'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs, toCreateBlog } from './reducers/blogReducer'
import { toSetUser, getUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/userListReducer'

const App = () => {
    const dispatch = useDispatch()
    const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)
    const blogs = useSelector((state) => state.blogs.slice().sort(byLikes))
    const user = useSelector((state) => state.user)
    const users = useSelector((state) => state.userList)
    const userMatch = useMatch('/users/:id')
    const blogMatch = useMatch('/blogs/:id')
    const inspectUser = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
        : null
    const inspectBlog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(getAllBlogs())
        dispatch(getUser())
        dispatch(getAllUsers())
    }, [dispatch])

    const login = async (username, password) => {
        loginService
            .login({
                username,
                password,
            })
            .then((user) => {
                dispatch(toSetUser(user))
                notify(`${user.name} logged in!`)
            })
            .catch(() => {
                notify('wrong username/password', 'alert')
            })
    }

    const createBlog = async (blog) => {
        dispatch(toCreateBlog(blog))
    }

    const notify = (message, type = 'info') => {
        dispatch(setNotification({ message, type }, 5000))
    }

    if (user === null) {
        return (
            <div className="container">
                <Notification />
                <LoginForm onLogin={login} />
            </div>
        )
    }

    return (
        <div className="container">
            <Menu />
            <Notification />
            <Routes>
                <Route path="/users" element={<Users users={users} />} />
                <Route
                    path="/users/:id"
                    element={<User user={inspectUser} />}
                />
                <Route
                    path="/blogs/:id"
                    element={<Blog blog={inspectBlog} user={user} />}
                />
                <Route
                    path="/"
                    element={
                        <>
                            <h2>blogs</h2>
                            <Togglable
                                buttonLabel="create new"
                                ref={blogFormRef}
                            >
                                <NewBlogForm onCreate={createBlog} />
                            </Togglable>
                            <Blogs blogs={blogs} />
                        </>
                    }
                />
            </Routes>
        </div>
    )
}

export default App
