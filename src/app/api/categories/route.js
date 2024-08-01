import {connectToDB} from "@/utils/database";
import Category from "@/models/category";
import {getCorsHeaders} from "@/app/api/options";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        await connectToDB();
        const categories = await Category.find({
            $or: [
                { name: new RegExp(query, "i") }
            ]
        })
            .populate('createdBy', 'name')
            .populate('updatedBy', 'name');
        return new Response(JSON.stringify(categories), { headers });
    } catch (e) {
        console.log(e);
        return new Response("Failed to fetch all categories", { status: 500, headers });
    }
};

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const { name, createdBy, updatedBy } = await request.json();

    try {
        await connectToDB();
        const newCategory = new Category({ name, createdBy, updatedBy });

        await newCategory.save();

        return new Response(JSON.stringify(newCategory), { status: 201, headers });
    } catch (e) {
        return new Response("Failed to create a new category", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
