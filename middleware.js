import { NextResponse } from 'next/server';

export function middleware(req) {
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Origin', 'https://inventory-management-system-7mrzg4o6i-makechi02s-projects.vercel.app');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: response.headers });
    }

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
