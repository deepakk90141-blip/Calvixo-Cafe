import {
    Search,
    CalendarDays,
    FileText,
    FileSpreadsheet,
    RefreshCw,
    ShoppingBag,
    Clock3,
    ChefHat,
    Truck,
    CheckCircle2,
} from "lucide-react";

const Orders = ({ orders = [], searchQuery = '', setSearchQuery = () => {}, onToday = () => {}, onRefresh = () => {}, onExport = () => {} }) => {
    const totals = {
        total: orders.length,
        pending: orders.filter((order) => order.status === 'Pending').length,
        preparing: orders.filter((order) => order.status === 'Preparing').length,
        delivery: orders.filter((order) => order.status === 'Out for Delivery').length,
        delivered: orders.filter((order) => order.status === 'Delivered').length,
    };

    return (
        <div className="orders-page">
            <div className="orders-header">
                <div className="orders-header-left">
                    <h2>📦 Orders Management</h2>
                    <p>Track, manage and update all customer orders.</p>
                </div>
                <div className="orders-header-right">
                    <div className="orders-search">
                        <Search size={18} />
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search orders..." />
                    </div>
                    <button className="orders-btn date-btn" onClick={onToday}><CalendarDays size={18} /> Today</button>
                    <button className="orders-btn pdf-btn" onClick={onExport}><FileText size={18} /> Export</button>
                    <button className="orders-btn refresh-btn" onClick={onRefresh}><RefreshCw size={18} /> Refresh</button>
                </div>
            </div>

            <div className="orders-stats">
                <div className="stat-card total"><div className="stat-icon"><ShoppingBag size={24} /></div><div className="stat-content"><span>Total Orders</span><h2>{totals.total}</h2></div></div>
                <div className="stat-card pending"><div className="stat-icon"><Clock3 size={24} /></div><div className="stat-content"><span>Pending</span><h2>{totals.pending}</h2></div></div>
                <div className="stat-card preparing"><div className="stat-icon"><ChefHat size={24} /></div><div className="stat-content"><span>Preparing</span><h2>{totals.preparing}</h2></div></div>
                <div className="stat-card delivery"><div className="stat-icon"><Truck size={24} /></div><div className="stat-content"><span>On Delivery</span><h2>{totals.delivery}</h2></div></div>
                <div className="stat-card delivered"><div className="stat-icon"><CheckCircle2 size={24} /></div><div className="stat-content"><span>Delivered</span><h2>{totals.delivered}</h2></div></div>
            </div>
        </div>
    );
};

export default Orders;