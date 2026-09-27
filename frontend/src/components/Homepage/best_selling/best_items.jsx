import { useContext, useEffect, useState } from 'react';
import { useToast } from '../../../Context/ToastContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import api from '../../../utils/api';

const Best_items = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const toast = useToast()

    const handleProtectedAction = () => {
        if (!user) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }
    };

    useEffect(() => {
        const loadItems = async () => {
            try {
                const response = await api.get('/menus/public/');
                setItems((response.data?.data || []).slice(0, 6));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    return (
        <section className='premium-section'>
            <div className='section-heading'>
                <span className='section-badge'>🔥 Most Loved Dishes</span>
                <h2>Freshly prepared favourites from our kitchen</h2>
                <p>Every dish is curated from live backend data and served with a premium experience.</p>
            </div>

            {loading ? (
                <div className='section-loading'>Loading curated dishes...</div>
            ) : (
                <div className='Best_items'>
                    {items.slice(0, 4).map((item) => (
                        <div className='container premium-card' key={item.id}>
                            <div className='item-img'>
                                <img src={item.image_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'} alt={item.name} />
                            </div>
                            <div className="content">
                                <h2>{item.name}</h2>
                                <p>{item.category}</p>
                                <div className='rat-button'>
                                    <h3>₹{item.price}</h3>
                                    <button type='button' onClick={() => {
                                        if (!user) return handleProtectedAction()
                                        const priceVal = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
                                        const payload = {
                                            user: user.id || user.user_id || user.pk,
                                            product_id: item.id,
                                            product_name: item.name,
                                            price: priceVal,
                                            quantity: 1,
                                            image_url: item.image_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800'
                                        }
                                        api.post('/cart/', payload)
                                            .then(() => toast.showToast('Added to cart', { type: 'info' }))
                                            .catch(() => toast.showToast('Failed to add to cart', { type: 'error' }))
                                    }}>+ Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Best_items