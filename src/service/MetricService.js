import axios from "axios";

const ITEMS_API_BASE_URL = "/api/admin/metrics";

const MetricService = {
    getAllMetrics: () => {
        return axios.get(ITEMS_API_BASE_URL);
    }
}

export default MetricService;