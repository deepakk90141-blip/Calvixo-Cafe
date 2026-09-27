import React from "react";

const DeliveryStatus = ({ orders = [], partners = [] }) => {
  const statusCounts = orders.reduce((acc, order) => {
    const status = order.status || "Pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusOrder = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
  const items = statusOrder.map((status) => ({
    status,
    orders: statusCounts[status] || 0,
    progress: Math.max(8, Math.round(((statusCounts[status] || 0) / Math.max(1, orders.length)) * 100)),
    color: status === "Delivered" ? "#16a34a" : status === "Cancelled" ? "#ef4444" : status === "Out for Delivery" ? "#f59e0b" : status === "Preparing" ? "#3b82f6" : "#64748b",
  }));

  const activePartners = partners.filter((partner) => partner.is_active).length;

  return (
    <div className="delivery-status">
      <h3>Delivery Status</h3>
      <p style={{ marginTop: '-6px', color: '#64748b' }}>{activePartners} active partners</p>

      {items.map((item, index) => (
        <div className="delivery-item" key={`${item.status}-${index}`}>
          <div className="delivery-header">
            <span>{item.status}</span>
            <span>{item.orders} Orders</span>
          </div>

          <div className="delivery-bar">
            <div
              className="delivery-fill"
              style={{
                width: `${item.progress}%`,
                background: item.color,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryStatus;