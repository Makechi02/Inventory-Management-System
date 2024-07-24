import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import Item from "@/models/item";
import Category from "@/models/category";
import {getCorsHeaders} from "@/app/api/options";

export async function GET(request) {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    try {
        await connectToDB();

        const totalUsers = await User.countDocuments({});
        const totalItems = await Item.countDocuments({});
        const totalCategories = await Category.countDocuments({});

        const recentUsers = await User.find({}).sort({ createdAt: -1 }).limit(5);
        const recentItems = await Item.find({}).sort({ createdAt: -1 }).limit(5);
        const recentCategories = await Category.find({}).sort({ createdAt: -1 }).limit(5);

        return new Response(JSON.stringify({
            totalUsers,
            totalItems,
            totalCategories,
            recentUsers,
            recentItems,
            recentCategories,
        }), { status: 200, headers });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch metrics' }), { status: 500, headers });
    }
}

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
