import {getCorsHeaders} from "@/app/api/options";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

const ITEMS_BASE_URL = 'https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/items';

export const GET = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const itemId = params.id;

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.get(`${ITEMS_BASE_URL}/${itemId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const item = response.data;
        return new Response(JSON.stringify(item), { status: response.status, headers });
    } catch (e) {
        console.error(e);
        return new Response(`Item with id ${itemId} not found`, { status: 404, headers });
    }
};

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const updatedItem = await request.json();

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.put(`${ITEMS_BASE_URL}/${params.id}`, updatedItem, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return new Response(JSON.stringify(response.data), { status: 200, headers });
    } catch (e) {
        console.error(e);
        if (e.response.status === 400) {
            return new Response(e.response.data.message, { status: e.response.status, headers });
        }
        return new Response("Failed to update item", { status: 500, headers });
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.delete(`${ITEMS_BASE_URL}/${params.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return new Response(response.data, { status: response.status, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to delete item", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {
        status: 200,
        headers,
    });
};
