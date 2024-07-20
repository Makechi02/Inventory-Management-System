import axios from "axios";

const ITEMS_API_BASE_URL = "/api/items";

const ItemService = {
    getAllItems: () => {
        return axios.get(ITEMS_API_BASE_URL);
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