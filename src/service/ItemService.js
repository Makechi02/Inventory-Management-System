import axios from "axios";

const ITEMS_API_BASE_URL = "/api/items";

const ItemService = {
    getAllItems: (params) => {
        const queryString = params?.query ? `?query=${params.query}` : '';
        return axios.get(`${ITEMS_API_BASE_URL}/${queryString}`);
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