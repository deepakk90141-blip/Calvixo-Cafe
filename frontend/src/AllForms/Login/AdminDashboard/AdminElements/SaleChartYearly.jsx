import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const SalesChartYearly = ({ orders = [] }) => {
    const yearlySales = orders.reduce((acc, order) => {
        const createdAt = order.created_at ? new Date(order.created_at) : null;
        if (!createdAt || Number.isNaN(createdAt.getTime())) return acc;

        const year = String(createdAt.getFullYear());
        const amount = Number(order.total_amount || 0);
        acc[year] = (acc[year] || 0) + amount;
        return acc;
    }, {});

    const years = Object.keys(yearlySales).sort((a, b) => Number(a) - Number(b));
    const data = years.map((year) => ({ year, sales: yearlySales[year] || 0 }));

    return (
        <div className="sales-card">
            <h3>Yearly Sales</h3>
            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#ff5722"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChartYearly;