import React, { useMemo, useState } from "react";

const Delivery_Partner_Details = ({ partners = [], orders = [], onRefresh }) => {
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [activeView, setActiveView] = useState("profile");
    const [editForm, setEditForm] = useState({ full_name: '', phone: '', vehicle: '', is_active: true });
    const [assignOrderId, setAssignOrderId] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const assignedOrders = useMemo(() => {
        if (!selectedPartner) return [];
        return orders.filter((order) => order.delivery_partner === selectedPartner.id);
    }, [orders, selectedPartner]);

    const filteredPartners = useMemo(() => {
        const q = (search || '').trim().toLowerCase();
        return partners.filter((p) => {
            if (statusFilter !== 'All') {
                if ((p.is_active ? 'active' : 'inactive') !== statusFilter.toLowerCase()) return false;
            }
            if (!q) return true;
            return (`${p.full_name || ''}`.toLowerCase().includes(q) || `${p.phone || ''}`.includes(q));
        });
    }, [partners, search, statusFilter]);
    
    const openProfile = (partner) => {
        setSelectedPartner(partner);
        setActiveView('profile');
        setAssignOrderId('');
    };

    const openEdit = (partner) => {
        setSelectedPartner(partner);
        setActiveView('edit');
        setAssignOrderId('');
        setEditForm({
            full_name: partner.full_name || '',
            phone: partner.phone || '',
            vehicle: partner.vehicle || '',
            is_active: Boolean(partner.is_active),
        });
    };

    const openAssign = (partner) => {
        setSelectedPartner(partner);
        setActiveView('assign');
        setAssignOrderId('');
    };

    const saveEdit = (event) => {
        event.preventDefault();
        if (!selectedPartner) return;
        onRefresh?.({ type: 'partner-edit', partnerId: selectedPartner.id, payload: editForm });
        setSelectedPartner(null);
    };

    const assignOrder = (event) => {
        event.preventDefault();
        if (!selectedPartner || !assignOrderId) return;
        onRefresh?.({ type: 'assign-order', partnerId: selectedPartner.id, orderId: Number(assignOrderId) });
        setAssignOrderId('');
        setSelectedPartner(null);
    };

    const toggleStatus = (partner) => {
        onRefresh?.({ type: 'partner-toggle', partnerId: partner.id, payload: { is_active: !partner.is_active } });
    };

    return (
        <div className="partner-view-shell">
            <div className="partner-toolbar">
                <div className="partner-toolbar-controls">
                    <input className="partner-search" placeholder="Search partners" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <select className="partner-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button className="partner-reset-btn" type="button" onClick={() => { setSearch(''); setStatusFilter('All'); }}>Reset</button>
            </div>

            <div className="partner-details-wrapper">
                {filteredPartners.map((partner) => (
                    <div className="partner-details-card" key={partner.id}>
                        <div className="partner-details-header">
                            <div className="partner-name-block">
                                <div className="partner-initials">{(partner.full_name || 'U').charAt(0)}</div>
                                <div>
                                    <h3>{partner.full_name}</h3>
                                    <p>{partner.city || 'Delivery partner'}</p>
                                </div>
                            </div>
                            <span className={`partner-badge ${partner.is_active ? 'active' : 'inactive'}`}>{partner.is_active ? 'Active' : 'Inactive'}</span>
                        </div>

                        <div className="partner-basic-details">
                            <p><span>Partner ID</span>{partner.id}</p>
                            <p><span>Mobile</span>{partner.phone}</p>
                            <p><span>Vehicle</span>{partner.vehicle}</p>
                            <p><span>Status</span>{partner.is_active ? 'Available' : 'Paused'}</p>
                        </div>

                        <div className="partner-detail-actions">
                            <button className="assign-btn" type="button" onClick={() => openProfile(partner)}>View</button>
                            <button className="edit-btn" type="button" onClick={() => openEdit(partner)}>Edit</button>
                            <button className="disable-btn" type="button" onClick={() => openAssign(partner)}>Assign</button>
                            <button className="toggle-btn" type="button" onClick={() => { if (window.confirm('Change partner status?')) toggleStatus(partner); }}>{partner.is_active ? 'Disable' : 'Enable'}</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPartner && (
                <div className="partner-modal-overlay" onClick={() => setSelectedPartner(null)}>
                    <div className="partner-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="partner-modal-header">
                            <div>
                                <p className="modal-eyebrow">Delivery Partner</p>
                                <h3>{selectedPartner.full_name}</h3>
                            </div>
                            <button className="partner-modal-close" type="button" onClick={() => setSelectedPartner(null)}>Close</button>
                        </div>

                        <div className="partner-modal-tabs">
                            <button className={activeView === 'profile' ? 'active' : ''} onClick={() => setActiveView('profile')}>Profile</button>
                            <button className={activeView === 'edit' ? 'active' : ''} onClick={() => { setEditForm({ full_name: selectedPartner.full_name || '', phone: selectedPartner.phone || '', vehicle: selectedPartner.vehicle || '', is_active: Boolean(selectedPartner.is_active) }); setActiveView('edit'); }}>Edit</button>
                            <button className={activeView === 'assign' ? 'active' : ''} onClick={() => { setAssignOrderId(''); setActiveView('assign'); }}>Assign</button>
                        </div>

                        {activeView === 'profile' && (
                            <div className="partner-modal-grid">
                                <div className="partner-modal-panel">
                                    <p><strong>Partner ID:</strong> {selectedPartner.id}</p>
                                    <p><strong>Phone:</strong> {selectedPartner.phone}</p>
                                    <p><strong>Vehicle:</strong> {selectedPartner.vehicle}</p>
                                    <p><strong>Status:</strong> {selectedPartner.is_active ? 'Active' : 'Inactive'}</p>
                                    <p><strong>Created At:</strong> {selectedPartner.created_at || '—'}</p>
                                </div>
                                <div className="partner-modal-panel">
                                    <h4>Assigned Orders</h4>
                                    {assignedOrders.length > 0 ? (
                                        <ul>
                                            {assignedOrders.map((order) => (
                                                <li key={order.id}>#{order.order_number} • {order.status}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="partner-empty">No orders assigned yet.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeView === 'edit' && (
                            <form className="partner-modal-form" onSubmit={saveEdit}>
                                <input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} placeholder="Full name" />
                                <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="Phone" />
                                <input value={editForm.vehicle} onChange={(e) => setEditForm({ ...editForm, vehicle: e.target.value })} placeholder="Vehicle" />
                                <label>
                                    <input type="checkbox" checked={editForm.is_active} onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })} />
                                    Active
                                </label>
                                <div className="partner-form-actions">
                                    <button type="submit" className="partner-save-btn">Save</button>
                                    <button type="button" className="partner-cancel-btn" onClick={() => setSelectedPartner(null)}>Cancel</button>
                                </div>
                            </form>
                        )}

                        {activeView === 'assign' && (
                            <form className="partner-modal-form" onSubmit={assignOrder}>
                                <select value={assignOrderId} onChange={(e) => setAssignOrderId(e.target.value)}>
                                    <option value="">Select order to assign</option>
                                    {orders.filter((order) => order.delivery_partner !== selectedPartner.id).map((order) => (
                                        <option key={order.id} value={order.id}>{order.order_number}</option>
                                    ))}
                                </select>
                                <div className="partner-form-actions">
                                    <button type="submit" className="partner-save-btn">Assign</button>
                                    <button type="button" className="partner-cancel-btn" onClick={() => setSelectedPartner(null)}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Delivery_Partner_Details;