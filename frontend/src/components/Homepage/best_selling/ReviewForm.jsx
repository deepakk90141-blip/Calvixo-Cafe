import React, { useState } from 'react';
import api from '../../../utils/api';

const ReviewForm = () => {
  const [form, setForm] = useState({ customer_name: '', email: '', rating: '5', comment: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await api.post('/submit-review/', form);
      setStatus('Thanks! Your review has been submitted for approval.');
      setForm({ customer_name: '', email: '', rating: '5', comment: '' });
    } catch (error) {
      setStatus('Please fill all fields correctly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '760px', margin: '40px auto', padding: '24px', borderRadius: '16px', background: '#fff', boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}>
      <h3 style={{ marginBottom: '8px' }}>Share Your Experience</h3>
      <p style={{ color: '#64748b', marginBottom: '16px' }}>Tell us what you loved about our food and service.</p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
        <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Your name" required style={inputStyle} />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your email" required style={inputStyle} />
        <select name="rating" value={form.rating} onChange={handleChange} style={inputStyle}>
          <option value="5">5 ★</option>
          <option value="4">4 ★</option>
          <option value="3">3 ★</option>
          <option value="2">2 ★</option>
          <option value="1">1 ★</option>
        </select>
        <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Write your review" rows="4" required style={{ ...inputStyle, minHeight: '110px' }} />
        <button type="submit" disabled={loading} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      {status && <div style={{ marginTop: '12px', color: '#0f766e', fontWeight: 600 }}>{status}</div>}
    </div>
  );
};

const inputStyle = { padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' };

export default ReviewForm;