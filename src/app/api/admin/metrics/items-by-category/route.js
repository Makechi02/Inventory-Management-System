import {connectToDB} from "@/utils/database";
import Item from "@/models/item";
import {getCorsHeaders} from "@/app/api/options";

export async function GET(request) {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    try {
        await connectToDB();
        const itemsByCategory = await Item.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    categoryName: "$category.name"
                }
            }
        ]);
        return new Response(JSON.stringify(itemsByCategory), {status: 200, headers});
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({message: 'Error fetching items by category', e}), {status: 500, headers});
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};