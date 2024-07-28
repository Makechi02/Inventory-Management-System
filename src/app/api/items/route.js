import {connectToDB} from "@/utils/database";
import Item from "@/models/item";
import {getCorsHeaders} from "@/app/api/options";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || Infinity;

    try {
        await connectToDB();

        const searchFilter = {
            $and: [
                {
                    $or: [
                        { name: new RegExp(query, "i") },
                        { brand: new RegExp(query, "i") },
                        { model: new RegExp(query, "i") },
                        { sku: new RegExp(query, "i") }
                    ]
                },
                {
                    price: {
                        $gte: minPrice,
                        $lte: maxPrice
                    }
                }
            ]
        };

        if (category) {
            searchFilter.$and.push({ category });
        }

        const items = await Item.find(searchFilter)
            .populate('category')
            .populate('createdBy', 'name')
            .populate('updatedBy', 'name');
        return new Response(JSON.stringify(items), { headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to fetch all items", { status: 500, headers });
    }
};

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const item = await request.json();

    try {
        await connectToDB();
        const newItem = new Item(item);
        await newItem.save();
        return new Response(JSON.stringify(newItem), { status: 201, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to create a new item", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, { status: 200, headers });
};
