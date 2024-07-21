import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import {getCorsHeaders} from "@/app/api/options";

export const GET = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const userId = params.id;

    try {
        await connectToDB();
        const user = await User.find({ _id: userId });
        return new Response(JSON.stringify(user), { headers });
    } catch (e) {
        return new Response(`User with id ${userId} not found`, { status: 404, headers });
    }
};

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const user = await request.json();

    try {
        await connectToDB();
        const response = await User.updateOne({ _id: params.id }, user);
        return new Response(JSON.stringify(response), { status: 200, headers });
    } catch (e) {
        return new Response("Failed to update user", { status: 500, headers });
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    try {
        await connectToDB();
        await User.deleteOne({ _id: params.id });
        return new Response("Success", { status: 200, headers });
    } catch (e) {
        return new Response("Failed to delete user", { status: 500, headers });
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
