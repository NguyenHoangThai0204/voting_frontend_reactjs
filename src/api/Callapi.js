import axios from 'axios'

var userApi = axios.create({
    baseURL:'http://localhost:3000/api/user'
})

export const getUserApiNoneToken = (url, data)=>{
    return userApi.get(url, data)
}
export const postUserApiNoneToken = (url, data)=>{
    return userApi.post(url, data)
}
