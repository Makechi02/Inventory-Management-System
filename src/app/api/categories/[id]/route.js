import {getCorsHeaders} from "@/app/api/options";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

const CATEGORIES_BASE_URL = 'https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/categories';

export const GET = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const categoryId = params.id;

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.get(`${CATEGORIES_BASE_URL}/${categoryId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const category = response?.data;
        return new Response(JSON.stringify(category), { headers });
    } catch (e) {
        return new Response(`Category with id ${categoryId} not found`, { status: 500, headers });
    }
};

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const updatedCategory = await request.json();

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.put(`${CATEGORIES_BASE_URL}/${params.id}`, updatedCategory, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return new Response(JSON.stringify(response.data), { status: 200, headers });
    } catch (e) {
        if (e.response.status === 400) {
            return new Response(e.response.data.message, {status: 400, headers});
        } else if (e.response.status === 409) {
            return new Response(e.response.data.message, { status: 409, headers });
        } else {
            console.error(e);
            return new Response("Failed to update category", { status: 500, headers });
        }
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.delete(`${CATEGORIES_BASE_URL}/${params.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return new Response(response.data, { status: 200, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to delete category", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
