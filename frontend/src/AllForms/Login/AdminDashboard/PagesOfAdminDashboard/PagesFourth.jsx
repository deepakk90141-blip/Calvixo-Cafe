import React, { useEffect, useState } from 'react';
import DeliveryPartnerHeader from '../AdminElements/DeliveryPartnerHeader';
import Delivery_Partner_Details from '../AdminElements/Delivery_Partner_Details';
import { adminApi } from '../../../../utils/adminApi';

const PagesFourth = () => {
  const [partners, setPartners] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ full_name: '', phone: '', vehicle: '', is_active: true });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadPartners = async () => {
    try {
      const response = await adminApi.get('/delivery-partners/');
      setPartners(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await adminApi.get('/orders/');
      setOrders(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPartners();
    loadOrders();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await adminApi.post('/delivery-partners/', form);
      setMessage('Delivery partner added successfully.');
      setForm({ full_name: '', phone: '', vehicle: '', is_active: true });
      await loadPartners();
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to add partner.');
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerAction = async ({ type, partnerId, payload, orderId }) => {
    try {
      if (type === 'partner-edit') {
        await adminApi.patch(`/delivery-partners/${partnerId}/`, payload);
      } else if (type === 'partner-toggle') {
        await adminApi.patch(`/delivery-partners/${partnerId}/`, payload);
      } else if (type === 'assign-order') {
        await adminApi.patch(`/orders/${orderId}/`, { delivery_partner: partnerId });
      }
      setMessage('Action completed successfully.');
      await Promise.all([loadPartners(), loadOrders()]);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to complete action.');
    }
  };

  return (
    <div className='main-content'>
        <DeliveryPartnerHeader partnersCount={partners.length} />
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '16px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <h3 style={{ marginBottom: '12px' }}>Add New Delivery Partner</h3>
          <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <input name="full_name" placeholder="Full name" value={form.full_name} onChange={handleChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            <input name="vehicle" placeholder="Vehicle" value={form.vehicle} onChange={handleChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
              Active
            </label>
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: '12px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer' }}>
            {loading ? 'Adding...' : 'Add Partner'}
          </button>
          {message && <div style={{ marginTop: '10px', color: '#0f766e' }}>{message}</div>}
        </form>
        <Delivery_Partner_Details partners={partners} orders={orders} onRefresh={handlePartnerAction} />
    </div>
  );
};

export default PagesFourth