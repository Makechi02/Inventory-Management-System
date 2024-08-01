import {connectToDB} from "@/utils/database";
import {getCorsHeaders} from "@/app/api/options";
import Supplier from "@/models/supplier";

export const GET = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const supplierID = params.id;

    try {
        await connectToDB();
        const supplier = await Supplier.find({ _id: supplierID });
        return new Response(JSON.stringify(supplier), { headers });
    } catch (e) {
        return new Response("Supplier with id not found", { status: 500, headers });
    }
};

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const {name, phone, address, updatedBy} = await request.json();
    try {
        await connectToDB();
        const response = await Supplier.updateOne(
            { _id: params.id },
            {
                $set: {name, phone, address, updatedBy, updatedAt: Date.now()}
            }
        );
        return new Response(JSON.stringify(response), { status: 200, headers });
    } catch (e) {
        return new Response("Failed to update supplier", { status: 500, headers });
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    try {
        await connectToDB();
        await Supplier.deleteOne({ _id: params.id });
        return new Response("Success", { status: 200, headers });
    } catch (e) {
        return new Response("Failed to delete supplier", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {
        status: 200,
        headers,
    });
};
