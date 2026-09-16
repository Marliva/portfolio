import api from './axios'

export function getSkills() {
    return api.get('/skills')
}

export function createSkill(data) {
    return api.post('/skills', data)
}

export function updateSkill(id, data) {
    return api.patch(`/skills/${id}`, data)
}

export function deleteSkill(id) {
    return api.delete(`/skills/${id}`)
}