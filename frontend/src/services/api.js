import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  me: (token) => api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

export const actorApi = {
  list: (params) => api.get('/actors', { params }),
  detail: (id) => api.get(`/actors/${id}`),
  create: (data, token) => api.post('/actors', data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  update: (id, data, token) => api.put(`/actors/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  delete: (id, token) => api.delete(`/actors/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

export const newsApi = {
  list: (params) => api.get('/news', { params }),
  detail: (id) => api.get(`/news/${id}`),
}

export const requirementApi = {
  list: (token) => api.get('/requirements', {
    headers: { Authorization: `Bearer ${token}` }
  }),
  create: (data) => api.post('/requirements', data),
  delete: (id, token) => api.delete(`/requirements/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

export const posterApi = {
  list: () => api.get('/posters'),
  create: (data, token) => api.post('/posters', data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  update: (id, data, token) => api.put(`/posters/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  delete: (id, token) => api.delete(`/posters/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  }),
}

export default api
