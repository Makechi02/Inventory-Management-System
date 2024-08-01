import {connectToDB} from "@/utils/database";
import Category from "@/models/category";
import {getCorsHeaders} from "@/app/api/options";

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
    const {name, updatedBy} = await request.json();
    try {
        await connectToDB();
        const response = await Category.updateOne(
            { _id: params.id },
            {
                $set: {name, updatedAt: Date.now(), updatedBy}
            }
        );
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
