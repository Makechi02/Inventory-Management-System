import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import {getCorsHeaders} from "@/app/api/options";

export const POST = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    try {
        await connectToDB();

        const { userId, currentPassword, newPassword } = await request.json();

        const user = await User.findById(userId);
        if (!user) {
            return new Response("User not found", { status: 404, headers });
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return new Response("Current password is incorrect", { status: 400, headers });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return new Response("Password updated successfully", { status: 200, headers });
    } catch (error) {
        console.error('Error updating password:', error);
        return new Response("Failed to update password", { status: 500, headers });
    }
};
