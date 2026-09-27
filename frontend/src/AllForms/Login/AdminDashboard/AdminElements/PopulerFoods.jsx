import React from "react";

const PopularFoods = ({ orders = [] }) => {
    const itemCounts = orders.reduce((acc, order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        items.forEach((item) => {
            const name = item?.name || item?.product_name || item?.item_name || "Unknown Item";
            const quantity = Number(item?.quantity || 1);
            acc[name] = (acc[name] || 0) + quantity;
        });
        return acc;
    }, {});

    const popularItems = Object.entries(itemCounts)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

    const maxCount = Math.max(...popularItems.map((item) => item.quantity), 1);

    return (
        <div className="popular-foods">
            <h3>Popular Foods</h3>

            {popularItems.length === 0 ? (
                <p style={{ color: '#64748b' }}>No order items recorded yet.</p>
            ) : popularItems.map((food, index) => (
                <div className="food-item" key={`${food.name}-${index}`}>
                    <div className="food-info">
                        <span className="food-emoji">🍽️</span>
                        <div>
                            <h4>{food.name}</h4>
                            <p>{food.quantity} Orders</p>
                        </div>
                    </div>

                    <div className="progress">
                        <div
                            className="progress-fill"
                            style={{ width: `${Math.max(20, Math.round((food.quantity / maxCount) * 100))}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PopularFoods;