import api from './axios'

export function getProjects() {
    return api.get('/projects')
}

export function createProject(data) {
    return api.post('/projects', data)
}

export function updateProject(id, data) {
    return api.patch(`/projects/${id}`, data)
}

export function deleteProject(id) {
    return api.delete(`/projects/${id}`)
}