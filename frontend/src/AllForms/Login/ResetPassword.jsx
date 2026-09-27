import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../../Context/API_Context";

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useContext(ApiContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!otp || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await resetPassword({ token: otp, password });
            alert(response.message || "Password reset successfully.");
            navigate("/login");
        } catch (error) {
            console.error("Reset password error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Unable to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Reset Password</h2>
                <p className="login-subtitle">
                    Enter the OTP from your email and set a new password.
                </p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="otp">OTP</label>
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            id="otp"
                            placeholder="Enter the OTP"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="new-password">New Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="new-password"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm new password"
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                    <p className="auth-bottom-text">
                        Back to <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
