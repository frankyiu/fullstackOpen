import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            return state.concat(action.payload)
        },
        removeBlog(state, action) {
            return state.filter((a) => a.id !== action.payload.id)
        },
        updateBlog(state, action) {
            return state.map((a) =>
                a.id !== action.payload.id ? a : action.payload.data
            )
        },
    },
})
export const getAllBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const toCreateBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blog)
            dispatch(appendBlog(newBlog))
            dispatch(
                setNotification(
                    {
                        message: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
                    },
                    5000
                )
            )
        } catch (e) {
            dispatch(
                setNotification(
                    {
                        message:
                            'creating a blog failed: ' + e.response.data.error,
                        type: 'alert',
                    },
                    5000
                )
            )
        }
    }
}

export const toRemoveBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(removeBlog({ id }))
    }
}

export const toLikeBlog = (id, data) => {
    return async (dispatch) => {
        try {
            const likedBlog = await blogService.update(id, data)
            dispatch(
                setNotification(
                    {
                        message: `you liked '${likedBlog.title}' by ${likedBlog.author}`,
                    },
                    5000
                )
            )
            dispatch(updateBlog({ id, data: likedBlog }))
        } catch (e) {
            console.error(e)
        }
    }
}

export const toCommentBlog = (id, comment) => {
    return async (dispatch) => {
        try {
            const commentedBlog = await blogService.comment(id, comment)
            dispatch(
                setNotification(
                    {
                        message: `you commented '${commentedBlog.title}' by ${commentedBlog.author}`,
                    },
                    5000
                )
            )
            dispatch(updateBlog({ id, data: commentedBlog }))
        } catch (e) {
            console.error(e)
        }
    }
}

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
    blogsSlice.actions
export default blogsSlice.reducer
