const allowedOrigins = [
    'https://inventory-management-system-7mrzg4o6i-makechi02s-projects.vercel.app',
    'https://inventory-management-system-nu-umber.vercel.app'
];

export const getCorsHeaders = (origin) => {
    const headers = new Headers();
    if (allowedOrigins.includes(origin)) {
        headers.set('Access-Control-Allow-Origin', origin);
    } else {
        headers.set('Access-Control-Allow-Origin', 'null'); // You can set it to 'null' if the origin is not allowed
    }
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return headers;
};