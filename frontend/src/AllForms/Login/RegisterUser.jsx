import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { FaUser, FaPhone, FaEnvelope, FaLock, FaCalendar, FaVenusMars, FaCity, FaMapMarkedAlt, FaMapPin, FaHome, } from "react-icons/fa";
import CalvixoLogo from "../../components/CalvixoLogo";
import { ApiContext } from "../../Context/API_Context";



const RegisterLoginUser = () => {

    const { registerUser } = useContext(ApiContext);

    const [formData, setFormData] = useState({

        full_name: "",
        mobile_no: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        city: "",
        state: "",
        pincode: "",
        full_address: ""

    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(formData);

        try {

            const response = await registerUser(formData);

            console.log(response);

            alert("Registration Successful");

        } catch (error) {

            console.log(error.response.data);
            alert("Registration Failed");

        }

    };
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };






    return (
        <>
            <section className="register-section" style={{ display: 'block' }}>
                <div className="register-container">
                    <div className="register-header">
                        <span>CREATE ACCOUNT</span>
                        <h2>Register With <span><CalvixoLogo width={200} height={55} /></span></h2>
                        <p>
                            Create your account to enjoy exclusive offers and services.
                        </p>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>Full Name</label>
                            <div className="input-box">
                                <FaUser />
                                <input
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Mobile Number</label>
                            <div className="input-box">
                                <FaPhone />
                                <input
                                    name="mobile_no"
                                    value={formData.mobile_no}
                                    onChange={handleChange}
                                    type="tel"
                                    placeholder="Enter mobile number"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Email Address</label>
                            <div className="input-box">
                                <FaEnvelope />
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Enter email address"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <div className="input-box">
                                <FaLock />
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Create password"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Confirm Password</label>
                            <div className="input-box">
                                <FaLock />
                                <input
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Confirm password"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Date Of Birth</label>
                            <div className="input-box">
                                <FaCalendar />
                                <input
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    type="date"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Gender</label>
                            <div className="input-box">
                                <FaVenusMars />
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option>Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <label>City</label>
                            <div className="input-box">
                                <FaCity />
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter city"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>State</label>
                            <div className="input-box">
                                <FaMapMarkedAlt />
                                <input
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter state"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Pin Code</label>
                            <div className="input-box">
                                <FaMapPin />
                                <input
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter pin code"
                                />
                            </div>
                        </div>
                        <div className="field address-field">
                            <label>Full Address</label>
                            <div className="input-box">
                                <FaHome />
                                <textarea
                                    name="full_address"
                                    value={formData.full_address}
                                    onChange={handleChange}
                                    placeholder="Enter complete address"
                                    rows="4"
                                />
                            </div>
                        </div>
                        <label className="terms">
                            <input type="checkbox" />
                            <span>
                                I agree to Terms & Conditions
                            </span>
                        </label>
                        <button type="submit">
                            Register
                        </button>
                        <p className="login-text">
                            Already have an account?
                            <Link to="/login">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
            <section className="login-section" style={{ display: 'none' }}>
                <div className="login-container">
                    <div className="login-header">
                        <span>WELCOME BACK</span>
                        <h2>Login To Calvixo</h2>
                        <p>
                            Login to manage your account and enjoy our services.
                        </p>
                    </div>
                    <form className="login-form">
                        <div className="field">
                            <label>Email Address</label>
                            <div className="input-box">
                                <FaEnvelope />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <div className="input-box">
                                <FaLock />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        <div className="login-options">
                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>
                            <a href="#">
                                Forgot Password?
                            </a>
                        </div>
                        <button type="submit">
                            Login
                        </button>
                        <p className="register-text">
                            Don't have an account?
                            <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
};


export default RegisterLoginUser;