import React from "react";

const RecentOrders = ({ orders = [] }) => {
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 5);

  return (
    <div className="recent-orders">
      <h3>Recent Orders</h3>

      {recentOrders.length === 0 ? (
        <p style={{ color: '#64748b' }}>No recent orders found.</p>
      ) : recentOrders.map((order) => {
        const itemNames = Array.isArray(order.items)
          ? order.items.map((item) => item?.name || item?.product_name || "Item").join(", ")
          : "No items";

        return (
          <div className="order-item" key={order.id || order.order_number}>
            <div>
              <h4>{order.order_number || `#${order.id}`}</h4>
              <p>{order.customer_name || order.customer_email || "Customer"}</p>
              <span>{itemNames}</span>
            </div>

            <div className="order-right">
              <h4>₹{Number(order.total_amount || 0).toLocaleString()}</h4>
              <span className={`status ${String(order.status || "pending").toLowerCase().replace(/\s+/g, "-")}`}>
                {order.status || "Pending"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentOrders;