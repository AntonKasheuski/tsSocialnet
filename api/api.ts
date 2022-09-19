import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "61333b73-228a-45e4-880d-e33b8d4ecb29"
    },
})

export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number, showFollowedUsers?: boolean) {
        const params = {
            page: currentPage,
            count: pageSize,
            friend: showFollowedUsers,
        }
        if (!showFollowedUsers) {
            delete params.friend
        }
        let response = await instance.get(`users`, {params})
        return response.data
    },
    async getUsersForSearch(term: string) {
        let response = await instance.get(`users/?count=10&term=${term}`)
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
    async updateStatus(status: string) {
        let response = await instance.put(`profile/status`, {status})
        return response.data
    },
    async updateProfilePhoto(image: File) {
        const formData = new FormData();
        formData.append("image", image);
        let response = await instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}