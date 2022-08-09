import axios from 'axios'

let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const baseUrl = '/api/users'

const setUser = (user) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    token = user.token
}

const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        token = user.token
        return user
    }

    return null
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const clearUser = () => {
    localStorage.clear()
    token = null
}

const getToken = () => token

export default {
    setUser,
    getUser,
    clearUser,
    getToken,
    getAll,
}
