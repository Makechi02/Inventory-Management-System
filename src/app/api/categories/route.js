import {connectToDB} from "@/utils/database";
import Category from "@/models/category";

export const GET = async (request) => {
    try {
        await connectToDB();
        const categories = await Category.find();
        return new Response(JSON.stringify(categories));
    } catch (e) {
        console.log(e);
        return new Response("Failed to fetch all categories", {status: 500});
    }
}

export const POST = async (request) => {
    const {name} = await request.json();
    try {
        await connectToDB();
        const newCategory = new Category({name});

        await newCategory.save();

        return new Response(JSON.stringify(newCategory), {status: 201});
    } catch (e) {
        return new Response("Failed to create a new category", {status: 500})
    }
}