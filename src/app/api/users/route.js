import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import {getCorsHeaders} from "@/app/api/options";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    try {
        await connectToDB();
        const users = await User.find();
        return new Response(JSON.stringify(users), {headers});
    } catch (e) {
        console.log(e);
        return new Response("Failed to fetch all users", {status: 500, headers});
    }
}

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const user = await request.json();
    try {
        await connectToDB();
        const newUser = new User(user);
        await newUser.save();
        return new Response(JSON.stringify(newUser), {status: 201, headers});
    } catch (e) {
        console.error(e);
        return new Response("Failed to save new user", {status: 500, headers})
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};