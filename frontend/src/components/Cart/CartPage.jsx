import React, { useContext, useEffect, useState } from 'react'
import api from '../../utils/api'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const formatRupee = (v) => {
    return '₹' + Number(v).toFixed(2)
}

const CartPage = () => {
    const { user } = useContext(UserContext)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchCart = async () => {
        if (!user) return
        setLoading(true)
        try {
            const res = await api.get(`/cart/${user.id}/`)
            setItems(res.data.data || [])
        } catch (err) {
            setError(err.response?.data || err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [user])

    const removeItem = async (id) => {
        try {
            await api.delete(`/cart/item/${id}/`)
            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }

    const updateQuantity = async (id, newQty) => {
        try {
            await api.patch(`/cart/item/${id}/`, { quantity: newQty })
            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }

    const totalPrice = items.reduce((acc, it) => {
        const price = Number(it.price) || 0
        return acc + price * (Number(it.quantity) || 0)
    }, 0)

    if (!user) return <div style={{ padding: 20 }}>Please login to view your cart.</div>

    return (
        <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
            <h2>Your Cart</h2>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{JSON.stringify(error)}</div>}
            {!loading && items.length === 0 && <div>Your cart is empty.</div>}

            <div style={{ display: 'grid', gap: 12 }}>
                {items.map(item => {
                    const price = Number(item.price) || 0
                    const qty = Number(item.quantity) || 0
                    const subtotal = price * qty

                    return (
                        <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #eee', padding: '12px 0', flexWrap: 'wrap' }}>
                            {item.image_url && <img src={item.image_url} alt={item.product_name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />}
                            <div style={{ flex: 1, minWidth: 200 }}>
                                <div style={{ fontWeight: 600 }}>{item.product_name}</div>
                                <div style={{ color: '#666', marginTop: 6 }}>{formatRupee(price)} × {qty} = {formatRupee(subtotal)}</div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <button onClick={() => updateQuantity(item.id, qty - 1)} style={{ padding: '6px 8px' }}>−</button>
                                <div style={{ minWidth: 28, textAlign: 'center' }}>{qty}</div>
                                <button onClick={() => updateQuantity(item.id, qty + 1)} style={{ padding: '6px 8px' }}>+</button>
                            </div>

                            <div>
                                <button onClick={() => removeItem(item.id)} style={{ background: '#ff4d4f', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6 }}>Remove</button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {items.length > 0 && (
                <div style={{ position: 'fixed', right: 20, bottom: 20, left: 20, maxWidth: 1000, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: 12, boxShadow: '0 4px 14px rgba(0,0,0,0.08)', borderRadius: 8 }}>
                    <div style={{ fontWeight: 700 }}>Total: {formatRupee(totalPrice)}</div>
                    <div>
                        <button onClick={() => navigate('/checkout', { state: { items, total: totalPrice } })} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 6 }}>Buy</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
