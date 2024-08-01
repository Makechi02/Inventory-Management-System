import {model, models, Schema} from "mongoose";

const SupplierSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required']
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Phone is required']
    },
    address: {
        type: String,
        unique: true,
        required: [true, 'Address is required']
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

SupplierSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});


const Supplier = models.Supplier || model('Supplier', SupplierSchema);

export default Supplier;