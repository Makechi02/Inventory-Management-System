import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://inventory-management-system-7mrzg4o6i-makechi02s-projects.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const GET = async (request) => {
    try {
        await connectToDB();
        const categories = await Category.find();
        return new Response(JSON.stringify(categories), { headers: corsHeaders });
    } catch (e) {
        console.log(e);
        return new Response("Failed to fetch all categories", { status: 500, headers: corsHeaders });
    }
}

export const POST = async (request) => {
    const { name } = await request.json();
    try {
        await connectToDB();
        const newCategory = new Category({ name });

        await newCategory.save();

        return new Response(JSON.stringify(newCategory), { status: 201, headers: corsHeaders });
    } catch (e) {
        return new Response("Failed to create a new category", { status: 500, headers: corsHeaders });
    }
}

export const OPTIONS = async () => {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}
