"use client"

import {UserAuthService} from "@/service/UserService";
import {showSuccessDialog} from "@/utils/sweetalertUtil";
import {useState} from "react";
import {useRouter} from "next/navigation";

const UpdatePasswordForm = ({userId}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const validatePassword = () => {
        if (!currentPassword) {
            setErrorMessage("Current password is required");
            return false;
        }
        if (!newPassword) {
            setErrorMessage("New password is required");
            return false;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return false;
        }
        if (newPassword.length < 8) {
            setErrorMessage("New password must be at least 8 characters long");
            return false;
        }
        return true;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!validatePassword()) return;

        try {
            const response = await UserAuthService.updateUserPassword({userId, currentPassword, newPassword});

            if (response.status === 200) {
                showSuccessDialog("Password updated successfully", () => router.push('/dashboard/admin/profile'));
            } else {
                setErrorMessage("Failed to update password");
            }
        } catch (e) {
            console.error(e);
            if (e.response.status === 400) {
                setErrorMessage("Current password is incorrect");
            } else {
                setErrorMessage("An error occurred while updating the password");
            }
        }
    };

    return (
        <div className={`mt-8`} id={`change-password`}>
            <h3 className={`font-bold font-gfs_didot mb-4`}>Update password</h3>

            {errorMessage && (
                <div className={`bg-red-100 text-red-800 p-4 rounded-lg mb-4`}>
                    <p>{errorMessage}</p>
                </div>
            )}

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