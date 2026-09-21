import api from './axios'

export function login(credentials) {
    return api.post('/login', credentials)
}

export function logout() {
    return api.post('/logout')
}