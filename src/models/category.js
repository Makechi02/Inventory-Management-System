import {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: [true, ""],
        required: [true, 'Name is required']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

CategorySchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});


const Category = models.Category || model('Category', CategorySchema);

export default Category;