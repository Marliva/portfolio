import api from './axios'

export function sendMessage(data) {
    return api.post('/contact', data)
}