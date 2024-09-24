import axios from "axios";

const USERS_API_BASE_URL = "/api/users";
// const USERS_AUTH_API_BASE_URL = "http://localhost:8080/api/v1/users/auth";
const USERS_AUTH_API_BASE_URL = "https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/users/auth";

export const UserAuthService = {
    saveUser: (user) => {
        return axios.post(`${USERS_AUTH_API_BASE_URL}/register`, user, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    updateUserPassword: (data) => {
        return axios.post(`${USERS_AUTH_API_BASE_URL}/update-password`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    login: (credentials) => {
        return axios.post(`${USERS_AUTH_API_BASE_URL}/login`, credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
}

export const UserService = {
    getAllUsers: (params) => {
        const queryString = params?.query ? `?query=${params.query}` : '';
        return axios.get(`${USERS_API_BASE_URL}/${queryString}`);
    },

    getUserById: (id) => {
        return axios.get(`${USERS_API_BASE_URL}/${id}`);
    },

    updateUser: (id, user) => {
        return axios.put(`${USERS_API_BASE_URL}/${id}`, user);
    },

    deleteUser: (id) => {
        return axios.delete(`${USERS_API_BASE_URL}/${id}`);
    }
};
