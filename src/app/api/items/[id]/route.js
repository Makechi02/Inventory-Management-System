import {connectToDB} from "@/utils/database";
import Item from "@/models/item";
import {getCorsHeaders} from "@/app/api/options";

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
    const {name, brand, model, quantity, price, category} = await request.json();

    try {
        await connectToDB();
        const response = await Item.updateOne(
            { _id: params.id },
            {$set: {name, brand, model, quantity, price, category, updatedAt: Date.now()}}
        );
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
