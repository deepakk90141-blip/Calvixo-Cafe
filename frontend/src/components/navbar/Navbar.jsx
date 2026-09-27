import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import CalvixoLogo from '../CalvixoLogo'
import ProfileMenu from './ProfileMenu'

const navItems = [
    { label: 'Home', to: '/Home' },
    { label: 'Menu', to: '/Menu' },
    { label: 'Delivery', to: '/Delivery' },
    { label: 'News', to: '/News' },
    { label: 'Party', to: '/Party' },
    { label: 'Careers', to: '/Careers' },
];

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <header className='navbar' style={{ marginTop: '0px', paddingTop: '0px' }}>
            <div className='nav-top'>
                <div id='image'>
                    <CalvixoLogo width={160} height={50} />
                </div>

                <nav className='navs'>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => (isActive ? 'active' : '')}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className='nav-actions'>
                    {user ? (
                        <ProfileMenu user={user} onLogout={handleLogout} />
                    ) : (
                        <button type='button' onClick={() => navigate('/login')}>Login</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;