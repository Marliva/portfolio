import api from './axios'

export function getMessages() {
    return api.get('/messages')
}

export function markAsRead(id) {
    return api.patch(`/messages/${id}/read`)
}

export function deleteMessage(id) {
    return api.delete(`/messages/${id}`)
}