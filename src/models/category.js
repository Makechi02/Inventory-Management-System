import {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: [true, ""],
        required: [true, 'Name is required']
    }
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;