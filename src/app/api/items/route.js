import {connectToDB} from "@/utils/database";
import Item from "@/models/item";

export const GET = async (request) => {
    try {
        await connectToDB();
        const items = await Item.find().populate('category');
        return new Response(JSON.stringify(items));
    } catch (e) {
        console.log(e);
        return new Response("Failed to fetch all items", {status: 500});
    }
}

export const POST = async (request) => {
    const item = await request.json();
    try {
        await connectToDB();
        const newItem = new Item(item);
        await newItem.save();
        return new Response(JSON.stringify(newItem), {status: 201});
    } catch (e) {
        console.error(e);
        return new Response("Failed to create a new item", {status: 500})
    }
}