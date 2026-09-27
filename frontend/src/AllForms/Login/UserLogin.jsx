import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { ApiContext } from "../../Context/API_Context";

const UserLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const { loginUser } = useContext(ApiContext);

    // const SubmitHandler = (e) => {
    //     e.preventDefault();
    //     if (!isChecked) {
    //         setEmail('');
    //         setPassword('');
    //     }
    //     if (user) {
    //         setUser(user);
    //         const redirectPath = location.state?.from || "/Home";
    //         navigate(redirectPath, { replace: true });
    //     } else {
    //         alert("Your account is not registerd please register Now");
    //         navigate("/register");
    //     }
    // };


    const SubmitHandler = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser({
                email: email,
                password: password
            });

            console.log("Login Response:", response);


            // user data save
            const normalizedUser = {
                ...response.user,
                id: response.user?.id ?? response.user?.user_id ?? response.user?.pk,
                user_id: response.user?.id ?? response.user?.user_id ?? response.user?.pk,
            };

            localStorage.setItem(
                "currentUser",
                JSON.stringify(normalizedUser)
            );
            localStorage.setItem(
                "user",
                JSON.stringify(normalizedUser)
            );

            // Context me save
            setUser(normalizedUser);


            alert("Login Successful");


            const redirectPath = location.state?.from || "/Home";

            navigate(redirectPath, { replace: true });


        } catch (error) {

            console.log("Login Error:", error.response?.data);

            alert("Email or Password is incorrect");

        }

    };






    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome {user?.name || 'Back'}</h2>
                <p className="login-subtitle">
                    Login to continue to Shoping
                </p>

                <form className="login-form" onSubmit={(e) => { SubmitHandler(e) }}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onSubmit={(e) => { SubmitHandler(e) }}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                ;
                            }}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>

                        <div className="password-field">
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                            />

                            <span
                                className="show-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    <div className="login-options">
                        <div className="remember">
                            <input type="checkbox" id="terms" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                            <label htmlFor="terms">
                                Remaimber me
                            </label>
                        </div>

                            <Link to="/forgot-password" className="forgot-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    <Link to="/admin/login" className="admin-login-btn">
                        Admin Login
                    </Link>

                    <p className="auth-bottom-text">
                        I have no account <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;