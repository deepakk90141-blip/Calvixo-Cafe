import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'

const Footer = () => {
    const [settings, setSettings] = useState({})

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const response = await api.get('/settings/public/');
                const data = response.data?.data || [];
                const mapped = Object.fromEntries(data.map((item) => [item.key, item.value]));
                setSettings(mapped);
            } catch (error) {
                console.error(error);
            }
        };

        loadSettings();
    }, []);

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-col">
                    <h3>About Us</h3>
                    <Link to="/Home">Our Story</Link>
                    <Link to="/Menu">Signature Menu</Link>
                    <Link to="/Party">Luxury Parties</Link>
                    <Link to="/Careers">Careers</Link>
                </div>

                <div className="footer-col">
                    <h3>Service</h3>
                    <Link to="/Delivery">Fast Delivery</Link>
                    <Link to="/News">Latest Updates</Link>
                    <Link to="/cart">Track Orders</Link>
                    <Link to="/login">Member Login</Link>
                </div>

                <div className="footer-col">
                    <h3>Community</h3>
                    <Link to="/Party">Birthday Packages</Link>
                    <Link to="/Careers">Join the Team</Link>
                    <Link to="/Menu">Weekly Specials</Link>
                    <Link to="/Home">Customer Reviews</Link>
                </div>

                <div className="footer-col">
                    <h3>Contact</h3>
                    <span className="footer-contact">{settings.support_number || '+91 98765 43210'}</span>
                    <span className="footer-contact">{settings.site_title || 'Calvixo Cafe'}</span>
                    <span className="footer-contact">Premium food experience delivered daily</span>
                </div>
            </div>

            <hr />

            <div className="footer-policy">
                <Link to="/Home">Privacy Policy</Link>
                <Link to="/Home">Terms & Conditions</Link>
                <Link to="/Home">Customer Support</Link>
            </div>

            <hr />

            <div className="copyright">
                © 2026 {settings.site_title || 'Calvixo Cafe'}. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer