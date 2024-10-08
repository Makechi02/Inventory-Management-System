import {getCorsHeaders} from "@/app/api/options";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        const url = `https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/users${query && '?query=' + query}`;
        // const url = `http://localhost:8080/api/v1/users${query && '?query=' + query}`;
        const response = await axios.get(url, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const users = response?.data;
        return new Response(JSON.stringify(users), {headers});
    } catch (e) {
        if (!e.response) {
            return new Response("No server response", {status: 500, headers});
        }
        console.log(e);
        return new Response("Failed to fetch all users", {status: 500, headers});
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};