import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

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
    const categoryId = params.id;

    try {
        await connectToDB();
        const category = await Category.find({ _id: categoryId });
        return new Response(JSON.stringify(category), { headers });
    } catch (e) {
        return new Response("Category with id not found", { status: 500, headers });
    }
};

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const category = await request.json();
    try {
        await connectToDB();
        const response = await Category.updateOne({ _id: params.id }, category);
        return new Response(JSON.stringify(response), { status: 200, headers });
    } catch (e) {
        return new Response("Failed to update category", { status: 500, headers });
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    try {
        await connectToDB();
        await Category.deleteOne({ _id: params.id });
        return new Response("Success", { status: 200, headers });
    } catch (e) {
        return new Response("Failed to delete category", { status: 500, headers });
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
