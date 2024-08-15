import {connectToDB} from "@/utils/database";
import Item from "@/models/item";
import {getCorsHeaders} from "@/app/api/options";
import {validateItem} from "@/utils/validation";
import {sanitizeInput} from "@/utils/sanitization";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
    const maxPrice = parseFloat(searchParams.get("maxPrice")) || Infinity;
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

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

        const skip = (page - 1) * limit;

        const items = await Item.find(searchFilter)
            .skip(skip)
            .limit(limit)
            .populate('category', 'name')
            .populate('supplier', 'name')
            .populate('createdBy', 'name')
            .populate('updatedBy', 'name');

       const totalItems = await Item.countDocuments(searchFilter);
       const totalPages = Math.ceil(totalItems / limit);

      return new Response(
            JSON.stringify({
                items,
                pagination: {page, limit, totalPages, totalItems}
            }),
            { headers }
        );
    } catch (e) {
        console.error(e);
        return new Response("Failed to fetch items", { status: 500, headers });
    }
};

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const item = await request.json();

    const validationErrors = validateItem(item);
    if (validationErrors.length > 0) {
        return new Response(JSON.stringify({ errors: validationErrors }), { status: 400, headers });
    }

    const sanitizedItem = sanitizeInput(item);

    try {
        await connectToDB();
        const newItem = new Item(sanitizedItem);
        await newItem.save();
        return new Response(JSON.stringify(newItem), { status: 201, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to create a new items", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, { status: 200, headers });
};
