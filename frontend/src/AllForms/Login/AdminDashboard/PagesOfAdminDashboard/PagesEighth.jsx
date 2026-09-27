import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../../utils/adminApi';

const PagesEighth = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await adminApi.get('/reviews/');
        setReviews(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  return (
    <div className="main-content">
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 28px rgba(0,0,0,0.08)', width:'175vh'}}>
        <h2>Reviews</h2>
        <p style={{ color: '#64748b' }}>Approve and monitor customer reviews submitted from the website.</p>
        <div style={{ marginTop: '30px' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{review.customer_name}</strong>
                <span>{review.rating}★</span>
              </div>
              <p style={{ margin: '8px 0', color: '#334155' }}>{review.comment}</p>
              <small>{review.email} • {review.status}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PagesEighth;
