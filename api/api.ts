import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "61333b73-228a-45e4-880d-e33b8d4ecb29"
    },
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const authAPI = {
    authorizationCheck() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {
            email,
            password,
            rememberMe
        })
            .then(response => response.data)
    },
    logOut() {
        return instance.delete(`/auth/login`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getCurrentUser(userId: number) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
}