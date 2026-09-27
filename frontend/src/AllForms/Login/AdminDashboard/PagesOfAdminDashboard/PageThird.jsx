import React, { useEffect, useState } from 'react';
import Orders from '../AdminElements/Orders';
import Order_Details from '../AdminElements/Order_Details';
import Customer_Details from '../AdminElements/Customer_Details';
import { adminApi } from '../../../../utils/adminApi';

const PageThird = () => {
    const [orders, setOrders] = useState([]);
        const [selectedOrder, setSelectedOrder] = useState(null);
        const [statusFilter, setStatusFilter] = useState('All');
        const [searchQuery, setSearchQuery] = useState('');
    // Removed add-order form state: admin manages orders only (view/edit)

    const loadOrders = async () => {
        try {
            const response = await adminApi.get('/orders/');
            setOrders(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleToday = () => {
        const today = new Date().toISOString().slice(0, 10);
        const filtered = orders.filter((o) => (o.created_at || '').slice(0, 10) === today);
        setOrders(filtered);
    };

    const handleRefresh = async () => {
        await loadOrders();
    };

    const handleExport = () => {
        // simple CSV export of currently filtered orders
        const rows = [['Order#','Customer','Items','Amount','Status','Created At']];
        const q = searchQuery.trim().toLowerCase();
        const filtered = orders.filter((o) => {
            if (statusFilter !== 'All' && (o.status || '').toLowerCase() !== statusFilter.toLowerCase()) return false;
            if (!q) return true;
            return (`${o.order_number}`.toLowerCase().includes(q) || `${o.customer_name}`.toLowerCase().includes(q));
        });
        filtered.forEach((o) => {
            const items = Array.isArray(o.items) ? o.items.map(i => `${i.name} x${i.qty || 1}`).join('; ') : (o.items || '');
            rows.push([o.order_number, o.customer_name, items, o.total_amount, o.status, o.created_at]);
        });
        const csv = rows.map(r => r.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders_export_${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // add-order handlers removed

    const handleView = async (order) => {
        try {
            const res = await adminApi.get(`/orders/${order.id}/`);
            setSelectedOrder(res.data || res.data.data || res.data);
        } catch (err) {
            console.error(err);
            alert('Unable to load order details');
        }
    };

    const handleEdit = async (order) => {
        try {
            const res = await adminApi.get(`/orders/${order.id}/`);
            setSelectedOrder(res.data || res.data.data || res.data);
        } catch (err) {
            console.error(err);
            alert('Unable to load order details');
        }
    };

    const handleCloseDetails = () => setSelectedOrder(null);

    const handleSaved = async () => {
        await loadOrders();
        setSelectedOrder(null);
    };

    return (
        <div className='main-content'>
            <Orders orders={orders} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onToday={handleToday} onRefresh={handleRefresh} onExport={handleExport} />
            {/* Add-order form removed — admin only manages existing orders */}
            <div className="orders-toolbar">
                <div className="orders-filter-pills">
                    {['All', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map((s) => (
                        <button key={s} className={`filter-pill ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
                    ))}
                </div>
                <div className="orders-toolbar-actions">
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search order # or customer" />
                    <button onClick={() => { setSearchQuery(''); setStatusFilter('All') }}>Reset</button>
                </div>
            </div>

            {/* filter orders client-side for responsiveness */}
            {(() => {
                const q = searchQuery.trim().toLowerCase();
                const filtered = orders.filter((o) => {
                    if (statusFilter !== 'All' && (o.status || '').toLowerCase() !== statusFilter.toLowerCase()) return false;
                    if (!q) return true;
                    return (`${o.order_number}`.toLowerCase().includes(q) || `${o.customer_name}`.toLowerCase().includes(q));
                });
                return <Order_Details orders={filtered} onView={handleView} onEdit={handleEdit} />
            })()}
            {selectedOrder && (
                <Customer_Details order={selectedOrder} onClose={handleCloseDetails} onSaved={handleSaved} />
            )}
        </div>
    );
};

export default PageThird