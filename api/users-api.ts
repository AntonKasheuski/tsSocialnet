import {instance} from "./api";

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