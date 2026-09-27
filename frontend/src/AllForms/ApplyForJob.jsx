import React, { useState } from "react";

import axios from "axios";
import { useToast } from "../Context/ToastContext";
import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaCity,
    FaBriefcase,
    FaClock,
    FaFileUpload,
    FaCommentDots,
} from "react-icons/fa";

const ApplyForJob = () => {
    const toast = useToast();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [position, setPosition] = useState("");
    const [experience, setExperience] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post("http://127.0.0.1:8000/apply-job/", {
                full_name: fullName,
                phone,
                email,
                city,
                position,
                experience,
                resume_filename: resumeFile?.name || "",
                message,
            });

            toast.showToast(response.data.message || "Application submitted successfully", { type: "info" });
            setFullName("");
            setPhone("");
            setEmail("");
            setCity("");
            setPosition("");
            setExperience("");
            setResumeFile(null);
            setMessage("");
        } catch (error) {
            toast.showToast(
                error.response?.data?.message || "Failed to submit application. Please try again.",
                { type: "error" }
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="career-form-section">
            <div className="container">
                <div className="section-title">
                    <span>JOIN CALVIXO</span>
                    <h2>Apply For A Position</h2>
                    <p>Start your career journey with our growing team.</p>
                </div>

                <form className="career-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <FaUser />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <FaPhone />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <FaEnvelope />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <FaCity />
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <FaBriefcase />
                        <select
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        >
                            <option value="">Select Position</option>
                            <option value="Chef">Chef</option>
                            <option value="Delivery Executive">Delivery Executive</option>
                            <option value="Manager">Manager</option>
                            <option value="Customer Support">Customer Support</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <FaClock />
                        <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        >
                            <option value="">Experience</option>
                            <option value="Fresher">Fresher</option>
                            <option value="1-3 Years">1-3 Years</option>
                            <option value="3+ Years">3+ Years</option>
                        </select>
                    </div>

                    <div className="form-group file-box">
                        <FaFileUpload />
                        <input
                            type="file"
                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        />
                        {resumeFile && <span className="file-name">{resumeFile.name}</span>}
                    </div>

                    <div className="form-group textarea">
                        <FaCommentDots />
                        <textarea
                            placeholder="Message"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Apply Now →"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ApplyForJob;