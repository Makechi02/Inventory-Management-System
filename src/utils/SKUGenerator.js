const SKUGenerator = {
    generateSKU: (name, category) => {
        const namePart = SKUGenerator.getNameInitials(name);
        const categoryPart = SKUGenerator.getCategoryInitials(category);
        const random = Math.floor(1000 + Math.random() * 9000);

        return `${namePart}-${categoryPart}-${random}`;
    },

    getNameInitials: (name) => {
        return name.slice(0, 3).toUpperCase();
    },

    getCategoryInitials: (category) => {
        return category.slice(0, 3).toUpperCase();
    }
}

export default SKUGenerator;