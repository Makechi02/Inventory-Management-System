import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import {getCorsHeaders} from "@/app/api/options";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        await connectToDB();
        const users = await User.find({
            $or: [
                { name: new RegExp(query, "i") },
                { email: new RegExp(query, "i") }
            ]
        });
        return new Response(JSON.stringify(users), {headers});
    } catch (e) {
        console.log(e);
        return new Response("Failed to fetch all users", {status: 500, headers});
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};