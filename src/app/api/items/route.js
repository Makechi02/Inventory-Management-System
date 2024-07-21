import {connectToDB} from "@/utils/database";
import Item from "@/models/item";
import {getCorsHeaders} from "@/app/api/options";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    try {
        await connectToDB();
        const items = await Item.find().populate('category');
        return new Response(JSON.stringify(items), {headers});
    } catch (e) {
        return new Response("Failed to fetch all items", {status: 500, headers});
    }
}

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const item = await request.json();

    try {
        await connectToDB();
        const newItem = new Item(item);
        await newItem.save();
        return new Response(JSON.stringify(newItem), {status: 201, headers});
    } catch (e) {
        console.error(e);
        return new Response("Failed to create a new item", {status: 500, headers})
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};