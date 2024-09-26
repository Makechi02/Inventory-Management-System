import {getCorsHeaders} from "@/app/api/options";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

const ITEMS_BASE_URL = 'https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/items';

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const size = parseInt(searchParams.get("size")) || 10;
    const page = parseInt(searchParams.get("page")) || 0;
    const sortBy = searchParams.get("sortBy") || "title";
    const sortDirection = searchParams.get("sortDirection") || "asc";

    try {
        const response = await axios.get(`${ITEMS_BASE_URL}`, {
            params: {
                query, size, page, sortBy, sortDirection
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return new Response(JSON.stringify(response.data), { status: response.status, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to fetch items", { status: 500, headers });
    }
};

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const item = await request.json();

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.post(ITEMS_BASE_URL, item, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const newItem = response.data;
        return new Response(JSON.stringify(newItem), { status: 201, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to create a new items", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, { status: 200, headers });
};
