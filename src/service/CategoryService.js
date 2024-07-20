import axios from "axios";

const CATEGORIES_API_BASE_URL = "http://localhost:3000/api/categories";

const CategoryService = {
    getAllCategories: () => {
        return axios.get(CATEGORIES_API_BASE_URL);
    },

    addCategory: (category) => {
        return axios.post(CATEGORIES_API_BASE_URL, category);
    },

    getCategoryById: (id) => {
        return axios.get(`${CATEGORIES_API_BASE_URL}/${id}`);
    },

    updateCategory: (id, category) => {
        return axios.put(`${CATEGORIES_API_BASE_URL}/${id}`, category, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },

    deleteCategory: (id) => {
        return axios.delete(`${CATEGORIES_API_BASE_URL}/${id}`);
    }
};

export default CategoryService;