import {getCorsHeaders} from "@/app/api/options";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

const CUSTOMERS_BASE_URL = 'https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/customers';

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        const url = `${CUSTOMERS_BASE_URL}${query && '?query=' + query}`;

        const response = await axios.get(url, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const customers = response?.data;
        return new Response(JSON.stringify(customers), { headers });
    } catch (e) {
        if (!e.response) {
            return new Response("No server response", {status: 500, headers});
        }
        console.log(e);
        return new Response("Failed to fetch all customers", { status: 500, headers });
    }
};

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);
    const newCustomer = await request.json();

    try {
        const response = await axios.post(`${CUSTOMERS_BASE_URL}`, newCustomer,{
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return new Response(JSON.stringify(response?.data), { status: 201, headers });
    } catch (e) {
        if (e.response.status === 409) {
            return new Response(JSON.stringify({ error: e.response.data.message }), { status: 409, headers });
        } else {
            console.error(e);
            return new Response("Failed to create a new customer", { status: 500, headers });
        }
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
