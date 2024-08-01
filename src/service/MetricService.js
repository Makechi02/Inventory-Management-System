import axios from "axios";

const METRICS_API_BASE_URL = "/api/admin/metrics";

const MetricService = {
    getAllMetrics: () => {
        return axios.get(METRICS_API_BASE_URL);
    },

    getStockLevels: () => {
        return axios.get(`${METRICS_API_BASE_URL}/stock-levels`);
    },

    getInventoryValuation: () => {
        return axios.get(`${METRICS_API_BASE_URL}/inventory-valuation`);
    },

    getItemsByCategory: () => {
        return axios.get(`${METRICS_API_BASE_URL}/items-by-category`);
    }
}

export default MetricService;