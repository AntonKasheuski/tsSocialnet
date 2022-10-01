import {instance} from "./api";

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