import {connectToDB} from "@/utils/database";
import Item from "@/models/item";
import {getCorsHeaders} from "@/app/api/options";

export async function GET(request) {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    try {
        await connectToDB();

        const stockLevels = await Item.find({}, 'name quantity');
        return new Response(JSON.stringify(stockLevels), {status: 200, headers});
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({message: 'Error fetching stock levels', e}), {status: 500, headers});
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};