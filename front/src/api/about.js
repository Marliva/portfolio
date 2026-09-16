import api from './axios'

export function getAbout() {
    return api.get('/about')
}

export function createAbout(data) {
    return api.post('/about', data)
}

export function updateAbout(id, data) {
    return api.patch(`/about/${id}`, data)
}

export function deleteAbout(id) {
    return api.delete(`/about/${id}`)
}