import axios from 'axios'

const BASE = '/api/students'

export const getAll       = ()         => axios.get(BASE)
export const getById      = (id)       => axios.get(`${BASE}/${id}`)
export const create       = (data)     => axios.post(BASE, data)
export const update       = (id, data) => axios.put(`${BASE}/${id}`, data)
export const remove       = (id)       => axios.delete(`${BASE}/${id}`)
export const searchByName = (name)     => axios.get(`${BASE}/search?name=${name}`)