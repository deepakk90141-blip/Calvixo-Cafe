import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../../Context/API_Context";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { forgotPassword } = useContext(ApiContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter your registered email.");
            return;
        }

        setLoading(true);
        try {
            const response = await forgotPassword({ email });
            alert(response.message || "OTP sent to your email.");
            navigate("/reset-password");
        } catch (error) {
            console.error("Forgot password error:", error.response?.data || error.message);
            alert("Unable to send reset OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Forgot Password</h2>
                <p className="login-subtitle">
                    Enter your email to receive a reset OTP.
                </p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="forgot-email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="forgot-email"
                            placeholder="Enter your registered email"
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                    <p className="auth-bottom-text">
                        Remembered password? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
