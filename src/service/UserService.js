import axios from "axios";

const USERS_API_BASE_URL = "/api/users";
const USERS_AUTH_API_BASE_URL = "/api/auth";

export const UserAuthService = {
    saveUser: (user) => {
        return axios.post(`${USERS_AUTH_API_BASE_URL}/register`, user, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
}

export const UserService = {
    getAllUsers: () => {
        return axios.get(USERS_API_BASE_URL);
    },

    getUserById: (id) => {
        return axios.get(`${USERS_API_BASE_URL}/${id}`);
    },

    updateUser: (id, user) => {
        return axios.put(`${USERS_API_BASE_URL}/${id}`, user, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    deleteUser: (id) => {
        return axios.delete(`${USERS_API_BASE_URL}/${id}`);
    }
};
