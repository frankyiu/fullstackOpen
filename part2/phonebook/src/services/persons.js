import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(respone => respone.data)
}

const create = newObject =>{
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteOne = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default{getAll, create , deleteOne , update}