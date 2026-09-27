import React, { useState } from "react";
import CalvixoLogo from '../../../../components/CalvixoLogo';
import { Printer, RefreshCw, CheckCircle, X } from "lucide-react";
import { adminApi } from '../../../../utils/adminApi';

const Customer_Details = ({ order, onClose = () => {}, onSaved = () => {} }) => {
    const [status, setStatus] = useState(order?.status || 'Pending');
    const [saving, setSaving] = useState(false);

    const saveStatus = async () => {
        setSaving(true);
        try {
            await adminApi.patch(`/orders/${order.id}/`, { status });
            await onSaved();
        } catch (err) {
            console.error(err);
            alert('Unable to update order status');
        } finally {
            setSaving(false);
        }
    };

    const printInvoice = () => window.print();

    const items = Array.isArray(order.items) ? order.items : (order.items ? JSON.parse(order.items) : []);
    const total = Number(order.total_amount || order.total || 0);
    const gst = Math.round(total * 0.05);
    const accent = '#0f172a';

    const overlayStyle = {
        position: 'fixed',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.45)',
        zIndex: 2100,
        padding: 20,
    }

    const cardStyle = {
        maxWidth: 980,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 32px 80px rgba(2,6,23,0.48)',
        padding: 20,
        position: 'relative',
        zIndex: 2110,
    }

    return (
        <div className="customer-detail-overlay" onClick={onClose} >
            <div className="customer-detail-card customer-details-card" onClick={(e) => e.stopPropagation()}>
                <div className="customer-details-header customer-detail-header">
                    <h2>Order #{order.order_number || order.id}</h2>
                    <div className="customer-detail-actions-top">
                        <CalvixoLogo width={140} height={40} />
                        <button onClick={onClose} aria-label="Close details" className="customer-detail-close"><X /></button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16, marginBottom: 12 }}>
                    <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10, fontWeight: 700 }}>Customer Details</div>
                        <div style={{ display: 'grid', gap: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 10px', borderRadius: 10, background: '#fff' }}>
                                <span style={{ color: '#64748b', fontWeight: 600 }}>Name</span>
                                <span style={{ fontWeight: 700, color: accent, textAlign: 'right' }}>{order.customer_name || order.customer?.name || '—'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 10px', borderRadius: 10, background: '#fff' }}>
                                <span style={{ color: '#64748b', fontWeight: 600 }}>Email</span>
                                <span style={{ fontWeight: 600, color: '#475569', textAlign: 'right' }}>{order.customer_email || order.customer?.email || '—'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 10px', borderRadius: 10, background: '#fff' }}>
                                <span style={{ color: '#64748b', fontWeight: 600 }}>Phone</span>
                                <span style={{ fontWeight: 600, color: '#475569', textAlign: 'right' }}>{order.phone || order.customer?.phone || '—'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 10px', borderRadius: 10, background: '#fff' }}>
                                <span style={{ color: '#64748b', fontWeight: 600 }}>City</span>
                                <span style={{ fontWeight: 600, color: '#475569', textAlign: 'right' }}>{order.city || order.customer?.city || '—'}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10, fontWeight: 700 }}>Delivery Address</div>
                        <div style={{ color: '#475569', lineHeight: 1.7 }}>{order.delivery_address || order.customer?.delivery_address || '—'}</div>
                    </div>
                </div>

                <div style={{ marginTop: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: accent, marginBottom: 8 }}>Items</div>
                    <div style={{ display: 'grid', gap: 8 }}>
                        {items.map((it, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: 8, background: '#fff', border: '1px solid #eef2ff' }}>
                                <div>
                                    <div style={{ fontWeight: 700 }}>{it.name || it.product_name || it.title || 'Item'}</div>
                                    <div style={{ fontSize: 12, color: '#64748b' }}>{it.qty || it.quantity || 1} × ₹{it.price || it.amount || 0}</div>
                                </div>
                                <div style={{ fontWeight: 800, color: accent }}>₹{Number(it.price || it.amount || 0) * (it.qty || it.quantity || 1)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 12, alignItems: 'flex-end' }}>
                    <div style={{ minWidth: 220, background: '#fff', borderRadius: 8, padding: 12, border: '1px solid #eef2ff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}><span>Total</span><strong>₹{total}</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}><span>GST (approx)</span><strong>₹{gst}</strong></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontWeight: 800, fontSize: 16 }}><span>Final Total</span><strong>₹{total + gst}</strong></div>
                    </div>
                </div>

                <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: '#64748b' }}>Ordered</div>
                        <div style={{ color: '#475569' }}>{new Date(order.created_at).toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ fontSize: 13, color: '#64748b' }}>Payment</div>
                            <div style={{ fontWeight: 700 }}>{order.payment_method || '—'}</div>
                            {order.paid && <CheckCircle size={16} style={{ color: '#10b981', marginLeft: 8 }} />}
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '8px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                                <option value="Pending">Pending</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <button onClick={saveStatus} disabled={saving} style={{ padding: '10px 14px', borderRadius: 8, background: accent, color: '#fff', border: 'none' }}>
                                {saving ? 'Saving...' : 'Update'}
                            </button>
                            <button onClick={printInvoice} style={{ padding: '10px 14px', borderRadius: 8, background: '#fff', border: '1px solid #e5e7eb' }}>
                                <Printer size={16} /> Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer_Details;
