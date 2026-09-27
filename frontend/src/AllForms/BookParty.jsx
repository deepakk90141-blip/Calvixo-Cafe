import React, { useState } from "react";
import api from "../utils/api";
import { useToast } from "../Context/ToastContext";
import {
    FaUser,
    FaPhone,
    FaCalendarAlt,
    FaUsers,
    FaBox,
    FaCommentDots,
} from "react-icons/fa";

const BookParty = () => {
    const toast = useToast();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [packageType, setPackageType] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await api.post("/book-party/", {
                full_name: fullName,
                phone,
                event_date: eventDate,
                guests,
                package: packageType,
                message,
            });

            toast.showToast(response.data.message || "Party booked successfully", { type: "info" });
            setFullName("");
            setPhone("");
            setEventDate("");
            setGuests(1);
            setPackageType("");
            setMessage("");
        } catch (error) {
            toast.showToast(
                error.response?.data?.message || "Failed to book party. Please try again.",
                { type: "error" }
            );
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="book-section">
            <div className="book-container">
                <div className="book-title">
                    <span>🎉 BOOK YOUR PARTY</span>
                    <h2>Create Your Perfect Celebration</h2>
                    <p>Fill the details and our team will contact you shortly.</p>
                </div>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaUser />
                        <input
                            type="text"
                            placeholder="Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaPhone />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaCalendarAlt />
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaUsers />
                        <input
                            type="number"
                            min="1"
                            placeholder="Guests"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaBox />
                        <select
                            value={packageType}
                            onChange={(e) => setPackageType(e.target.value)}
                            required
                        >
                            <option value="">Select Package</option>
                            <option value="Silver Package">Silver Package</option>
                            <option value="Gold Package">Gold Package</option>
                            <option value="Platinum Package">Platinum Package</option>
                        </select>
                    </div>

                    <div className="input-group textarea">
                        <FaCommentDots />
                        <textarea
                            placeholder="Message"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Booking..." : "Book Now →"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default BookParty;