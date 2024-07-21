import axios from "axios";

const USERS_API_BASE_URL = "/api/users";

const UserService = {
    getAllUsers: () => {
        return axios.get(USERS_API_BASE_URL);
    },

    addUser: (user) => {
        return axios.post(USERS_API_BASE_URL, user);
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

export default UserService;