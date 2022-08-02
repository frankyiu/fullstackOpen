import axios from "axios";
const baseUrl = 'http://localhost:3001/anecdotes' 

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (object) => {
    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async(id) => {
    const target = (await axios.get(`${baseUrl}/${id}`)).data
    target.votes +=1
    const response = await axios.put(`${baseUrl}/${id}`, target)
    return response.data
}

export default { getAll, createNew, vote }