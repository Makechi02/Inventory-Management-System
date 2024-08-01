import {connectToDB} from "@/utils/database";
import Item from "@/models/item";
import {getCorsHeaders} from "@/app/api/options";

export async function GET(request) {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    try {
        await connectToDB();

        const items = await Item.find({}, 'name quantity price');
        const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        return new Response(JSON.stringify(totalValue), {status: 200, headers});
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({message: 'Error fetching inventory value', e}), {status: 500, headers});
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};