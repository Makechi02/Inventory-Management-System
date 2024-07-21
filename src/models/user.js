import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required']
    }
});

const User = models.User || model("User", UserSchema);

export default User;
