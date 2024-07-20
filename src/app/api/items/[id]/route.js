import {connectToDB} from "@/utils/database";
import Item from "@/models/item";

const allowedOrigins = [
    'https://inventory-management-system-7mrzg4o6i-makechi02s-projects.vercel.app',
    'https://inventory-management-system-nu-umber.vercel.app'
];

const getCorsHeaders = (origin) => {
    const headers = new Headers();
    if (allowedOrigins.includes(origin)) {
        headers.set('Access-Control-Allow-Origin', origin);
    } else {
        headers.set('Access-Control-Allow-Origin', 'null'); // You can set it to 'null' if the origin is not allowed
    }
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return headers;
};

export const GET = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const itemId = params.id;

    try {
        await connectToDB();
        const item = await Item.find({ _id: itemId }).populate('category');
        return new Response(JSON.stringify(item), { headers });
    } catch (e) {
        return new Response(`Item with id ${itemId} not found`, { status: 404, headers });
    }
};

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const item = await request.json();

    try {
        await connectToDB();
        const response = await Item.updateOne({ _id: params.id }, item);
        return new Response(JSON.stringify(response), { status: 200, headers });
    } catch (e) {
        return new Response("Failed to update item", { status: 500, headers });
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    try {
        await connectToDB();
        await Item.deleteOne({ _id: params.id });
        return new Response("Success", { status: 200, headers });
    } catch (e) {
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
