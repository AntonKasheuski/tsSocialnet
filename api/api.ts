import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "61333b73-228a-45e4-880d-e33b8d4ecb29"
    },
})

export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number) {
        let response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },
    async followUser(userId: number) {
        let response = await instance.post(`follow/${userId}`)
        return response.data
    },
    async unfollowUser(userId: number) {
        let response = await instance.delete(`follow/${userId}`)
        return response.data
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
    async getCurrentUser(userId: number) {
        let response = await instance.get(`profile/` + userId)
        return response.data
    },
    async getStatus(userId: number) {
        let response = await instance.get(`profile/status/` + userId)
        return response.data
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
}