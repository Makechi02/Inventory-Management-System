import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://inventory-management-system-7mrzg4o6i-makechi02s-projects.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const GET = async (request, { params }) => {
    const categoryId = params.id;

    try {
        await connectToDB();
        const category = await Category.find({ _id: categoryId });
        return new Response(JSON.stringify(category), { headers: corsHeaders });
    } catch (e) {
        return new Response("Category with id not found", { status: 500, headers: corsHeaders });
    }
}

export const PUT = async (request, { params }) => {
    const category = await request.json();
    try {
        await connectToDB();
        const response = await Category.updateOne({ _id: params.id }, category);
        return new Response(JSON.stringify(response), { status: 200, headers: corsHeaders });
    } catch (e) {
        return new Response("Failed to update category", { status: 500, headers: corsHeaders });
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Category.deleteOne({ _id: params.id });
        return new Response("Success", { status: 200, headers: corsHeaders });
    } catch (e) {
        return new Response("Failed to delete category", { status: 500, headers: corsHeaders });
    }
}

export const OPTIONS = async () => {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}
