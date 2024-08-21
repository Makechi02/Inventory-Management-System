export const sanitizeItem = (item) => {
    return {
        name: item.name.trim(),
        brand: item.brand.trim(),
        model: item.model.trim(),
        quantity: parseFloat(item.quantity),
        price: parseFloat(item.price),
        category: item.category.trim(),
        supplier: item.supplier.trim(),
        createdBy: item.createdBy,
        updatedBy: item.updatedBy
    };
};

export const sanitizeCategory = (category) => {
    return {
        name: category.name.trim(),
        createdBy: category.createdBy,
        updatedBy: category.updatedBy
    };
};
