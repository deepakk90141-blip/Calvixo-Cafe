import React from "react";
import CalvixoLogo from '../../../../components/CalvixoLogo'
import { SidebarPagesDataRoute } from '../../../../components/AllDatas/AllDatas'
import { FaSignOutAlt } from "react-icons/fa";
import { clearAdminToken } from '../../../../utils/adminAuth';

const SidebarPages = ({ setRoutes, admin, currentRoute }) => {
    const handleLogout = () => {
        clearAdminToken();
        window.location.href = '/admin/login';
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2 style={{ marginTop: '10px' }}>
                    <CalvixoLogo width={190} height={50} />
                </h2>
                <span>
                    Admin Panel
                </span>
                {admin && <small style={{ color: '#cbd5e1', marginTop: 6, display: 'block' }}>{admin.email}</small>}
            </div>
            <nav className="sidebar-menu">
                {SidebarPagesDataRoute.map((item, index) => (
                    <button
                        onClick={() => setRoutes(item.value)}
                        className={currentRoute === item.value ? "active menu-link" : "menu-link"}
                        key={item.value || index}>
                        <span className="menu-icon">
                            {item.icon}
                        </span>
                        <span>
                            {item.title}
                        </span>
                    </button>
                ))}
            </nav>
            <div className="logout">
                <button onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
};
export default SidebarPages;