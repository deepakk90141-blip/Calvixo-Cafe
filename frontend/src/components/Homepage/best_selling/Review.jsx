import React, { useEffect, useState } from 'react';
import MarqueeModule from "react-fast-marquee";
import api from '../../../utils/api';

const Marquee = MarqueeModule.default || MarqueeModule;

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const response = await api.get('/reviews/public/');
                setReviews(response.data?.data || []);
            } catch (error) {
                console.error(error);
            }
        };
        loadReviews();
    }, []);

    return (
        <div className="review-section" style={{ width: '100%', padding:'10px 0' }}>
            <Marquee speed={60} pauseOnHover={true} gradient={false}>
                {reviews.map((item) => (
                    <div className="review-card" key={item.id}>
                        <h3>⭐⭐⭐⭐⭐</h3>
                        <p>{item.comment}</p>
                        <h4>{item.customer_name}</h4>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Review;