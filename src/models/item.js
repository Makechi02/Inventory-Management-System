import {model, models, Schema} from "mongoose";
import Category from "@/models/category";
import SKUGenerator from "@/utils/SKUGenerator";

const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required']
    },
    model: {
        type: String,
        required: [true, 'Model is required']
    },
    sku: {
        type: String,
        required: [true, 'SKU is required']
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ItemSchema.pre('validate', async function(next) {
    if (this.isNew || !this.sku) {
        const category = await Category.findById(this.category);
        if (category) {
            this.sku = SKUGenerator.generateSKU(this.name, category.name);
        }
    }
    next();
});

ItemSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

const Item = models.Item || model("Item", ItemSchema);

export default Item;
