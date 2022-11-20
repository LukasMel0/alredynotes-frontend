import axios from 'axios'

export const api = axios.create({
    baseURL: "https://alredynotes-api.herokuapp.com"
})