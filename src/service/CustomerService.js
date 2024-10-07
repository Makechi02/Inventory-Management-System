import axios from "axios";

const CUSTOMERS_API_BASE_URL = "/api/customers";

const CustomerService = {
    getAllCustomers: (params) => {
        const queryString = params?.query ? `?query=${params.query}` : '';
        return axios.get(`${CUSTOMERS_API_BASE_URL}/${queryString}`);
    },

    addCustomer: (customer) => {
        return axios.post(CUSTOMERS_API_BASE_URL, customer);
    },

    getCustomerById: (id) => {
        return axios.get(`${CUSTOMERS_API_BASE_URL}/${id}`);
    },

    updateCustomer: (id, supplier) => {
        return axios.put(`${CUSTOMERS_API_BASE_URL}/${id}`, supplier);
    },

    deleteCustomer: (id) => {
        return axios.delete(`${CUSTOMERS_API_BASE_URL}/${id}`);
    }
};

export default CustomerService;