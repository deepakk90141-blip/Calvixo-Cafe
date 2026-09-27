import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '../../Context/ToastContext'
import { UserContext } from '../../Context/UserContext'
import CalvixoLogo from '../CalvixoLogo'

const formatRupee = (v) => '₹' + Number(v).toFixed(2)

// simple card validation (demo only) - do NOT use in production
const validateCard = ({ number, name, exp, cvv }) => {
    if (!number || number.replace(/\s+/g, '').length < 12) return false
    if (!name) return false
    if (!exp || !/^[0-9]{2}\/([0-9]{2})$/.test(exp)) return false
    if (!cvv || cvv.length < 3) return false
    return true
}

const CheckoutPage = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const toast = useToast()
    const items = state?.items || []
    const total = state?.total || items.reduce((acc, it) => acc + (Number(it.price) || 0) * (Number(it.quantity) || 0), 0)

    const { user } = useContext(UserContext)
    const [processing, setProcessing] = useState(false)
    const [method, setMethod] = useState('cod')
    const [card, setCard] = useState({ number: '', name: '', exp: '', cvv: '' })
    const [focusedField, setFocusedField] = useState(null)

    const [customer, setCustomer] = useState({
        name: user?.full_name || user?.name || user?.username || '',
        email: user?.email || '',
        mobile: user?.mobile_no || user?.mobile || user?.phone || '',
        delivery_location: user?.city || ''
    })
    const [editingCustomer, setEditingCustomer] = useState(false)
    const [originalCustomer, setOriginalCustomer] = useState(customer)

    const formStyles = {
        card: { border: '1px solid #e3e8ef', padding: 20, borderRadius: 16, boxShadow: '0 16px 40px rgba(15, 23, 42, 0.06)', background: '#fff' },
        sectionTitle: { marginTop: 0, marginBottom: 18, fontSize: 20, fontWeight: 700, color: '#14213d' },
        inputLabel: { display: 'block', fontSize: 12, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' },
        input: (field) => ({
            width: '100%',
            border: `1px solid ${focusedField === field ? '#ff6b00' : '#d1d5db'}`,
            padding: '12px 14px',
            borderRadius: 12,
            background: editingCustomer ? '#fff' : '#f8fafc',
            outline: 'none',
            transition: 'all 0.2s ease',
            color: '#0f172a',
            fontSize: 14,
            cursor: editingCustomer ? 'text' : 'not-allowed'
        }),
        buttonPrimary: (active) => ({
            background: active ? '#ff6b00' : '#f97316',
            color: '#fff',
            border: 'none',
            padding: '14px 20px',
            borderRadius: 12,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: active ? '0 12px 24px rgba(255, 107, 0, 0.22)' : '0 8px 16px rgba(255, 107, 0, 0.16)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            transform: active ? 'translateY(-1px)' : 'none'
        }),
        buttonSecondary: { background:'#f8fafc', border:'1px solid #cbd5e1', color:'#334155', padding:'12px 18px', borderRadius:12, cursor:'pointer' }
    }

    const handlePay = async () => {
        if (method === 'card' && !validateCard(card)) {
            toast.showToast('Invalid card details', { type: 'error' })
            return
        }

        setProcessing(true)

        // Simulate secure gateway flow (demo): in real app, call backend to create payment intent
        setTimeout(() => {
            setProcessing(false)
            const order = {
                id: 'ORD' + Date.now(),
                items,
                total,
                method: method === 'card' ? 'Card' : 'Cash on Delivery',
                paid: method === 'card',
                customer,
            }
            toast.showToast('Payment successful', { type: 'info' })
            navigate('/receipt', { state: { order } })
        }, 1200)
    }

    return (
        <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
            <header style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap:12 }}>
                    <CalvixoLogo width={140} height={40} />
                    <div style={{ fontSize: 14, color: '#666' }}>Secure Checkout</div>
                </div>
                <div style={{ textAlign:'right' }}>
                    <div style={{ fontWeight:700 }}>Order summary</div>
                    <div style={{ color:'#666' }}>{items.length} items</div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
                <div>
                    <div style={{ border: '1px solid #eee', padding: 18, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ marginTop:0 }}>Order summary</h3>
                        {items.map(it => (
                            <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #fafafa' }}>
                                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                                    <img src={it.image_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80'} alt={it.product_name} style={{ width:56, height:56, objectFit:'cover', borderRadius:8 }} />
                                    <div>
                                        <div style={{ fontWeight:600 }}>{it.product_name}</div>
                                        <div style={{ fontSize:12, color:'#666' }}>{it.quantity} × ₹{it.price}</div>
                                    </div>
                                </div>
                                <div style={{ fontWeight:600 }}>{formatRupee((Number(it.price)||0) * (Number(it.quantity)||0))}</div>
                            </div>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, fontWeight: 700 }}>
                            <div>Total</div>
                            <div>{formatRupee(total)}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 20, border: '1px solid #e2e8f0', padding: 18, borderRadius: 16, background:'#f8fafc', boxShadow:'0 15px 40px rgba(15, 23, 42, 0.06)' }}>
                        <h3 style={{ marginTop:0, marginBottom:16, fontSize:22, color:'#0f172a' }}>Customer Details</h3>
                        <div style={{ display: 'grid', gap: 16, marginBottom: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, color: '#475569', marginBottom: 6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Full name</label>
                                <input
                                    placeholder="Full name"
                                    value={customer.name}
                                    onChange={(e)=>setCustomer({...customer, name: e.target.value})}
                                    readOnly={!editingCustomer}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    style={{
                                        width: '100%',
                                        border: `1px solid ${focusedField === 'name' ? '#fb923c' : '#cbd5e1'}`,
                                        padding: '14px 16px',
                                        borderRadius: 12,
                                        background: editingCustomer ? '#fff' : '#f1f5f9',
                                        outline: 'none',
                                        transition: 'border-color 0.2s ease',
                                        color: '#0f172a',
                                        fontSize: 14,
                                        cursor: editingCustomer ? 'text' : 'not-allowed'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 12, color: '#475569', marginBottom: 6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Email</label>
                                <input
                                    placeholder="Email"
                                    value={customer.email}
                                    onChange={(e)=>setCustomer({...customer, email: e.target.value})}
                                    readOnly={!editingCustomer}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    style={{
                                        width: '100%',
                                        border: `1px solid ${focusedField === 'email' ? '#fb923c' : '#cbd5e1'}`,
                                        padding: '14px 16px',
                                        borderRadius: 12,
                                        background: editingCustomer ? '#fff' : '#f1f5f9',
                                        outline: 'none',
                                        transition: 'border-color 0.2s ease',
                                        color: '#0f172a',
                                        fontSize: 14,
                                        cursor: editingCustomer ? 'text' : 'not-allowed'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 12, color: '#475569', marginBottom: 6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Mobile number</label>
                                <input
                                    placeholder="Mobile number"
                                    value={customer.mobile}
                                    onChange={(e)=>setCustomer({...customer, mobile: e.target.value})}
                                    readOnly={!editingCustomer}
                                    onFocus={() => setFocusedField('mobile')}
                                    onBlur={() => setFocusedField(null)}
                                    style={{
                                        width: '100%',
                                        border: `1px solid ${focusedField === 'mobile' ? '#fb923c' : '#cbd5e1'}`,
                                        padding: '14px 16px',
                                        borderRadius: 12,
                                        background: editingCustomer ? '#fff' : '#f1f5f9',
                                        outline: 'none',
                                        transition: 'border-color 0.2s ease',
                                        color: '#0f172a',
                                        fontSize: 14,
                                        cursor: editingCustomer ? 'text' : 'not-allowed'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 12, color: '#475569', marginBottom: 6, textTransform:'uppercase', letterSpacing:'0.06em' }}>Delivery location / Landmark</label>
                                <input
                                    placeholder="Delivery location / Landmark"
                                    value={customer.delivery_location}
                                    onChange={(e)=>setCustomer({...customer, delivery_location: e.target.value})}
                                    readOnly={!editingCustomer}
                                    onFocus={() => setFocusedField('delivery_location')}
                                    onBlur={() => setFocusedField(null)}
                                    style={{
                                        width: '100%',
                                        border: `1px solid ${focusedField === 'delivery_location' ? '#fb923c' : '#cbd5e1'}`,
                                        padding: '14px 16px',
                                        borderRadius: 12,
                                        background: editingCustomer ? '#fff' : '#f1f5f9',
                                        outline: 'none',
                                        transition: 'border-color 0.2s ease',
                                        color: '#0f172a',
                                        fontSize: 14,
                                        cursor: editingCustomer ? 'text' : 'not-allowed'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 16, display:'flex', gap:12, flexWrap:'wrap' }}>
                            {!editingCustomer ? (
                                <button
                                    onClick={() => { setOriginalCustomer(customer); setEditingCustomer(true); }}
                                    style={{
                                        padding:'12px 18px',
                                        borderRadius: 12,
                                        border:'1px solid #cbd5e1',
                                        background:'#fff',
                                        color:'#0f172a',
                                        fontWeight:600,
                                        cursor:'pointer',
                                        transition:'all 0.2s ease'
                                    }}
                                >
                                    Edit details
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { setOriginalCustomer(customer); setEditingCustomer(false); }}
                                        style={{
                                            padding:'12px 18px',
                                            borderRadius: 12,
                                            border:'none',
                                            background:'#111827',
                                            color:'#fff',
                                            fontWeight:700,
                                            cursor:'pointer',
                                            transition:'transform 0.2s ease, background-color 0.2s ease'
                                        }}
                                    >
                                        Save details
                                    </button>
                                    <button
                                        onClick={() => { setCustomer(originalCustomer); setEditingCustomer(false); }}
                                        style={{
                                            padding:'12px 18px',
                                            borderRadius: 12,
                                            border:'1px solid #cbd5e1',
                                            background:'#f8fafc',
                                            color:'#334155',
                                            cursor:'pointer',
                                            transition:'all 0.2s ease'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>

                        <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 18, color: '#0f172a' }}>Payment</h3>
                        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input type="radio" name="method" checked={method==='card'} onChange={() => setMethod('card')} /> Card
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input type="radio" name="method" checked={method==='cod'} onChange={() => setMethod('cod')} /> Cash on Delivery
                            </label>
                        </div>

                        {method === 'card' && (
                            <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
                                <div>
                                    <label style={{ display:'block', marginBottom: 6, fontSize: 12, color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em' }}>Card number</label>
                                    <input
                                        placeholder="1234 5678 9012 3456"
                                        value={card.number}
                                        onChange={(e)=>setCard({...card, number:e.target.value})}
                                        style={{
                                            width:'100%',
                                            border:'1px solid #cbd5e1',
                                            borderRadius: 12,
                                            padding:'14px 16px',
                                            outline:'none',
                                            fontSize:14,
                                            color:'#0f172a'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display:'block', marginBottom: 6, fontSize: 12, color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em' }}>Name on card</label>
                                    <input
                                        placeholder="Cardholder name"
                                        value={card.name}
                                        onChange={(e)=>setCard({...card, name:e.target.value})}
                                        style={{
                                            width:'100%',
                                            border:'1px solid #cbd5e1',
                                            borderRadius: 12,
                                            padding:'14px 16px',
                                            outline:'none',
                                            fontSize:14,
                                            color:'#0f172a'
                                        }}
                                    />
                                </div>
                                <div style={{ display:'grid', gridTemplateColumns:'1fr 120px', gap:12 }}>
                                    <div>
                                        <label style={{ display:'block', marginBottom: 6, fontSize: 12, color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em' }}>Expiry</label>
                                        <input
                                            placeholder="MM/YY"
                                            value={card.exp}
                                            onChange={(e)=>setCard({...card, exp:e.target.value})}
                                            style={{
                                                width:'100%',
                                                border:'1px solid #cbd5e1',
                                                borderRadius: 12,
                                                padding:'14px 16px',
                                                outline:'none',
                                                fontSize:14,
                                                color:'#0f172a'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display:'block', marginBottom: 6, fontSize: 12, color:'#475569', textTransform:'uppercase', letterSpacing:'0.05em' }}>CVV</label>
                                        <input
                                            placeholder="123"
                                            value={card.cvv}
                                            onChange={(e)=>setCard({...card, cvv:e.target.value})}
                                            style={{
                                                width:'100%',
                                                border:'1px solid #cbd5e1',
                                                borderRadius: 12,
                                                padding:'14px 16px',
                                                outline:'none',
                                                fontSize:14,
                                                color:'#0f172a'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: 12, display:'flex', gap:12, flexWrap:'wrap' }}>
                            <button
                                onClick={handlePay}
                                disabled={processing}
                                style={{
                                    background: '#ff6b00',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '14px 22px',
                                    borderRadius: 14,
                                    fontWeight:700,
                                    boxShadow:'0 12px 30px rgba(255,107,0,0.22)',
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                    transition:'transform 0.2s ease, box-shadow 0.2s ease',
                                    transform: processing ? 'none' : 'translateY(-0.5px)'
                                }}
                            >
                                {processing ? 'Processing...' : `Pay ${formatRupee(total)}`}
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                style={{
                                    background:'#f8fafc',
                                    border:'1px solid #cbd5e1',
                                    padding:'14px 22px',
                                    borderRadius:14,
                                    color:'#334155',
                                    fontWeight:600,
                                    cursor:'pointer',
                                    transition:'background-color 0.2s ease, transform 0.2s ease'
                                }}
                                onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='#e2e8f0'}
                                onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='#f8fafc'}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>

                <aside>
                    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
                        <h3>Secure Checkout</h3>
                        <p>Payments are processed securely (demo). For production integrate with a real gateway like Stripe/PayPal/Razorpay.</p>
                        <ul>
                            <li>SSL / HTTPS recommended</li>
                            <li>PCI-compliant gateway</li>
                            <li>Receipt after successful payment</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default CheckoutPage
