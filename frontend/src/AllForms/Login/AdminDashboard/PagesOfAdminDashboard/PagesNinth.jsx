import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../../utils/adminApi';

const PagesNinth = () => {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: '', title: '', description: '', discount_percent: 10, valid_from: '', valid_to: '', is_active: true });
  const [message, setMessage] = useState('');

  const loadCoupons = async () => {
    try {
      const response = await adminApi.get('/coupons/');
      setCoupons(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { loadCoupons(); }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await adminApi.post('/coupons/', { ...form, discount_percent: Number(form.discount_percent) });
      setMessage('Coupon created successfully.');
      setForm({ code: '', title: '', description: '', discount_percent: 10, valid_from: '', valid_to: '', is_active: true });
      loadCoupons();
    } catch (error) {
      setMessage('Unable to create coupon.');
    }
  };

  return (
    <div className="main-content">
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 28px rgba(0,0,0,0.08)', width: '175vh' }}>
        <h2>Coupons</h2>
        <p style={{ color: '#64748b' }}>Manage discount offers for your customers.</p>
        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <input name="code" value={form.code} onChange={handleChange} placeholder="Coupon code" required style={inputStyle} />
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={inputStyle} />
            <input name="discount_percent" type="number" value={form.discount_percent} onChange={handleChange} placeholder="Discount %" style={inputStyle} />
            <input name="valid_from" type="date" value={form.valid_from} onChange={handleChange} style={inputStyle} />
            <input name="valid_to" type="date" value={form.valid_to} onChange={handleChange} style={inputStyle} />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows="2" style={{ ...inputStyle, minHeight: '80px' }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
              Active
            </label>
          </div>
          <button type="submit" style={{ marginTop: '12px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer' }}>Create Coupon</button>
          {message && <div style={{ marginTop: '10px', color: '#0f766e' }}>{message}</div>}
        </form>
        <div className='container' style={{ marginTop: '20px'}}>
          {coupons.map((coupon) => (
            <div key={coupon.id} style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '12px', marginBottom: '10px'}}>
              <strong>{coupon.code}</strong> - {coupon.title}
              <div style={{ color: '#64748b'}} >{coupon.discount_percent}% off • {coupon.is_active ? 'Active' : 'Inactive'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' };

export default PagesNinth;
