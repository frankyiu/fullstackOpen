import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credential) => {
    const request = await axios.post(baseUrl, credential)
    return request.data
}

export default { login }