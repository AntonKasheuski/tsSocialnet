import {instance} from "./api";

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