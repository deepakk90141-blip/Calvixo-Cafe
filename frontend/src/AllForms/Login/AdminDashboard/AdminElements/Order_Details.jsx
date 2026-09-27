import React, { useState, useMemo } from 'react';

const Order_Details = ({ orders = [], onView = () => {}, onEdit = () => {} }) => {
    const [page, setPage] = useState(1);
    const perPage = 10;

    const totalPages = useMemo(() => Math.max(1, Math.ceil((orders.length || 0) / perPage)), [orders.length]);

    const pageItems = useMemo(() => {
        const start = (page - 1) * perPage;
        return orders.slice(start, start + perPage);
    }, [orders, page]);

    return (
        <>
            <div className="orders-table" style={{marginTop:'20px'}}>
                <div className="table-head">
                    <div>ID</div>
                    <div>Customer</div>
                    <div>Items</div>
                    <div>Amount</div>
                    <div>Payment</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>
                {pageItems.map((order) => {
                    const itemsText = Array.isArray(order.items) ? order.items.map((item) => `${item.name || 'Item'} ×${item.qty || 1}`).join(', ') : order.items || '—';
                    return (
                        <div className="table-row" key={order.id}>
                            <div>#{order.order_number}</div>
                            <div>{order.customer_name}</div>
                            <div title={itemsText} style={{ maxWidth: 260 }}>{itemsText}</div>
                            <div>₹{order.total_amount}</div>
                            <div>{order.payment_method}</div>
                            <div>
                                <span className={`status ${order.status?.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="actions">
                                <button type="button" style={{color:'black'}} className="view-btn" onClick={() => onView(order)}>View</button>
                                <button type="button" className="update-btn" style={{color:'black'}} onClick={() => onEdit(order)}>Update</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="table-pagination">
                <button className="pagination-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
                <div className="pages">
                    <span>{page}</span>
                    <span>/</span>
                    <span>{totalPages}</span>
                </div>
                <button className="pagination-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
        </>
    );
};

export default Order_Details