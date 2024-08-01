import {connectToDB} from "@/utils/database";
import {getCorsHeaders} from "@/app/api/options";
import Supplier from "@/models/supplier";

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        await connectToDB();
        const suppliers = await Supplier.find({
            $or: [
                { name: new RegExp(query, "i") }
            ]
        })
            .populate('addedBy', 'name')
            .populate('updatedBy', 'name');
        return new Response(JSON.stringify(suppliers), { headers });
    } catch (e) {
        console.log(e);
        return new Response("Failed to fetch all suppliers", { status: 500, headers });
    }
};

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const { name, phone, address, addedBy, updatedBy } = await request.json();

    try {
        await connectToDB();
        const newSupplier = new Supplier({ name, phone, address, addedBy, updatedBy });

        await newSupplier.save();

        return new Response(JSON.stringify(newSupplier), { status: 201, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to create a new supplier", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
