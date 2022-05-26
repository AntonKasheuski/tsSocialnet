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
    async authorizationCheck() {
        let response = await instance.get(`auth/me`)
        return response.data
    },
    async logIn(email: string, password: string, rememberMe: boolean) {
        let response = await instance.post(`auth/login`, {
            email,
            password,
            rememberMe
        })
        return response.data
    },
    async logOut() {
        let response = await instance.delete(`/auth/login`)
        return response.data
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