"use client"

import {UserAuthService} from "@/service/UserService";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const UpdatePasswordForm = ({userId, role}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const validatePassword = () => {
        if (!currentPassword) {
            toast.error("Current password is required");
            return false;
        }
        if (!newPassword) {
            toast.error("New password is required");
            return false;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }
        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long");
            return false;
        }
        return true;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!validatePassword()) return;

        try {
            const response = await UserAuthService.updateUserPassword(userId, {currentPassword, newPassword});

            if (response.status === 200) {
                toast.success("Password updated successfully");
                router.push(`/dashboard/${role.toLowerCase()}/profile`);
            } else {
                toast.error("Failed to update password");
            }
        } catch (e) {
            console.error(e);
            if (e?.response?.status === 400) {
                toast.error(e?.response?.data?.message);
            } else {
                toast.error("An error occurred while updating the password");
            }
        }
    };

    return (
        <div className={`mt-8`} id={`change-password`}>
            <h3 className={`font-bold font-gfs_didot mb-4`}>Update password</h3>

            <form className={`space-y-4`} onSubmit={handleChangePassword}>
                <div className="input-box">
                    <label htmlFor="current-password" className={`dashboard-label`}>Current Password:</label>
                    <input
                        type="password"
                        id="current-password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        className={`dashboard-input`}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="new-password" className={`dashboard-label`}>New Password:</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className={`dashboard-input`}
                    />
                </div>

                <div className="input-box">
                    <label htmlFor="confirm-password" className={`dashboard-label`}>Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className={`dashboard-input`}
                    />
                </div>

                <button className={`dashboard-submit-btn`} type="submit">Update Password</button>
            </form>
        </div>
    )
}

export default UpdatePasswordForm;