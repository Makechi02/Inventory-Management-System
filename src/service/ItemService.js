import axios from "axios";

const ITEMS_API_BASE_URL = "/api/items";

const ItemService = {
    getAllItems: (params) => {
        const query = params.query;
        const category = params.category;
        const minPrice = params.minPrice;
        const maxPrice = params.maxPrice;
        const page = params.page || 1;
        const limit = params.limit || 10;

        const queryString = new URLSearchParams();

        if (query) queryString.append('query', query);
        if (category) queryString.append('category', category);
        if (minPrice) queryString.append('minPrice', minPrice);
        if (maxPrice) queryString.append('maxPrice', maxPrice);
        if (page) queryString.append('page', page);
        if (limit) queryString.append('limit', limit);

        return axios.get(`${ITEMS_API_BASE_URL}?${queryString.toString()}`);
    },

    addItem: (item) => {
        return axios.post(ITEMS_API_BASE_URL, item);
    },

    getItemById: (id) => {
        return axios.get(`${ITEMS_API_BASE_URL}/${id}`);
    },

    updateItem: (id, item) => {
        return axios.put(`${ITEMS_API_BASE_URL}/${id}`, item);
    },

    deleteItem: (id) => {
        return axios.delete(`${ITEMS_API_BASE_URL}/${id}`);
    }
}

export default ItemService;
