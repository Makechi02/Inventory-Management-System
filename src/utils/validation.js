export const validateItem = (item) => {
    const errors = [];

    if (!item.name || typeof item.name !== 'string') errors.push('Item name is required and must be a string.');
    if (!item.brand || typeof item.brand !== 'string') errors.push('Item brand is required and must be a string.');
    if (!item.model || typeof item.model !== 'string') errors.push('Item model is required and must be a string.');

    const quantity = parseFloat(item.quantity);
    if (isNaN(quantity) || quantity <= 0) errors.push('Quantity must be a positive number.');

    const price = parseFloat(item.price);
    if (isNaN(price) || price <= 0) errors.push('Price must be a positive number.');

    if (!item.category || typeof item.category !== 'string') errors.push('Category is required and must be a string.');
    if (!item.supplier || typeof item.supplier !== 'string') errors.push('Supplier is required and must be a string.');

    return errors;
};

export const validateCategory = (category) => {
    const errors = [];

    if (!category.name || typeof category.name !== 'string') {
        errors.push('Category name is required and must be a string.');
    }

    return errors;
};
