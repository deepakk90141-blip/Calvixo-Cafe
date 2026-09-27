import React, { useContext, useEffect, useState } from "react";
import { useToast } from '../../../Context/ToastContext'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from '../../../Context/UserContext';
import api from '../../../utils/api';

const Menu_items = ({ food }) => {
    const [wishlist, setWishlist] = useState({});
    const [menuGroups, setMenuGroups] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleWishlist = (id) => {
        setWishlist((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toast = useToast()

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const response = await api.get('/menus/public/');
                const items = response.data?.data || [];
                const grouped = items.reduce((acc, item) => {
                    const existing = acc.find((group) => group.category === item.category);
                    if (existing) {
                        existing.items.push(item);
                    } else {
                        acc.push({ category: item.category, items: [item] });
                    }
                    return acc;
                }, []);
                setMenuGroups(grouped);
            } catch (error) {
                console.error(error);
            }
        };
        loadMenu();
    }, []);

    const handleProtectedAction = () => {
        if (!user) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        // find the first matched item to add (this component maps multiple items)
        // actual per-item handler is defined inline in the map below
    };

    return (
        <section className="menu-container">
            {menuGroups
                .filter(
                    (category) => food === "All" || category.category === food
                )
                .map((category) => (
                    <div key={category.category} className="category">
                        <h1>{category.category}</h1>

                        {category.items.map((item) => (
                            <div className="menu-item" key={item.id}>
                                <div className="image-box">
                                    <img src={item.image_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'} alt={item.name} />
                                </div>

                                <div className="left">
                                    <div className="title">
                                        <h2>{item.name}</h2>

                                        <div className="title-right">
                                            <span>₹{item.price}</span>

                                            <button
                                                type='button'
                                                className="wishlist-btn"
                                                onClick={() => toggleWishlist(item.id)}
                                            >
                                                {wishlist[item.id]
                                                    ? <FaHeart />
                                                    : <FaRegHeart />}
                                            </button>
                                        </div>
                                    </div>

                                    <p>{item.description}</p>
                                </div>

                                <div className="right">
                                            <button type='button' onClick={() => {
                                                if (!user) return handleProtectedAction();
                                                const priceVal = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
                                                const currentUserId = user.id || user.user_id || user.pk || user._id;
                                                const payload = {
                                                    user: currentUserId,
                                                    product_id: item.id,
                                                    product_name: item.name,
                                                    price: priceVal,
                                                    quantity: 1,
                                                    image_url: item.image_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'
                                                };
                                                api.post('/cart/', payload)
                                                    .then(() => toast.showToast('Added to cart', { type: 'info' }))
                                                    .catch((error) => {
                                                        const detail = error.response?.data;
                                                        console.error('Add to cart failed:', detail);
                                                        toast.showToast('Failed to add to cart', { type: 'error' });
                                                    })
                                            }}>Add To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </section>
    );
};

export default Menu_items;