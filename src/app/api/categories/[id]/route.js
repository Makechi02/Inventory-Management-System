import {connectToDB} from "@/utils/database";
import Category from "@/models/category";

export const GET = async (request, {params}) => {
    const categoryId = params.id;

    try {
        await connectToDB();
        const category = await Category.find({_id: categoryId});
        return new Response(JSON.stringify(category));
    } catch (e) {
        return new Response("Category with id not found", {status: 500});
    }
}

export const PUT = async (request, {params}) => {
    const category = await request.json();
    try {
        await connectToDB();
        const response = await Category.updateOne({_id: params.id}, category);
        return new Response(JSON.stringify(response), {status: 200});
    } catch (e) {
        return new Response("Failed to update category", {status: 500});
    }
}

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();
        await Category.deleteOne({_id: params.id});
        return new Response("Success", {status: 200});
    } catch (e) {
        return new Response("Failed to delete category");
    }
}