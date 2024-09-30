import axios from "axios";

const SUPPLIERS_API_BASE_URL = "/api/suppliers";

const SupplierService = {
    getAllSuppliers: (params) => {
        const queryString = params?.query ? `?query=${params.query}` : '';
        return axios.get(`${SUPPLIERS_API_BASE_URL}/${queryString}`);
    },

    addSupplier: (supplier) => {
        return axios.post(SUPPLIERS_API_BASE_URL, supplier);
    },

    getSupplierById: (id) => {
        return axios.get(`${SUPPLIERS_API_BASE_URL}/${id}`);
    },

    updateSupplier: (id, supplier) => {
        return axios.put(`${SUPPLIERS_API_BASE_URL}/${id}`, supplier, {
            headers: { "Content-Type": "application/json" }
        });
    },

    deleteSupplier: (id) => {
        return axios.delete(`${SUPPLIERS_API_BASE_URL}/${id}`);
    }
};

export default SupplierService;