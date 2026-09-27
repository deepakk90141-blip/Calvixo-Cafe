import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CalvixoLogo from '../CalvixoLogo'

const formatRupee = (v) => '₹' + Number(v).toFixed(2)

const Receipt = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const order = state?.order

  useEffect(() => {
    if (!order) navigate('/Home')
  }, [order, navigate])

  if (!order) return null

  const printReceipt = () => window.print()

  return (
    <div className="receipt-page" style={{ padding: 20, maxWidth: 820, margin: '0 auto', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .receipt-print-area, .receipt-print-area * { visibility: visible; }
          .receipt-print-area { position: absolute; top: 0; left: 0; width: 100%; margin: 0; padding: 0; box-shadow: none; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="no-print" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <CalvixoLogo width={160} height={48} />
          <div style={{ color:'#666' }}>Official Receipt</div>
        </div>
        <div>
          <button onClick={printReceipt} style={{ marginRight: 8 }}>Print / Save</button>
          <button onClick={() => navigate('/Home')}>Close</button>
        </div>
      </div>

      <div className="receipt-print-area" style={{ border: '1px solid #eee', padding: 18, borderRadius: 8, marginTop: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
          <div>
            <div><strong>Order ID:</strong> {order.id}</div>
            <div style={{ color:'#666' }}><strong>Payment method:</strong> {order.method} • <strong>Paid:</strong> {order.paid ? 'Yes' : 'No'}</div>
          </div>
          {order.customer && (
            <div style={{ textAlign:'right' }}>
              <div style={{ fontWeight:700 }}>{order.customer.name}</div>
              <div style={{ color:'#666' }}>{order.customer.mobile} • {order.customer.email}</div>
              <div style={{ marginTop:6 }}><strong>Delivery location:</strong> {order.customer.delivery_location}</div>
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid #f3f3f3', paddingTop: 12 }}>
          {order.items.map((it) => (
            <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom:'1px dashed #f5f5f5' }}>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <img src={it.image_url || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80'} alt={it.product_name} style={{ width:56, height:56, objectFit:'cover', borderRadius:6 }} />
                <div>
                  <div style={{ fontWeight:600 }}>{it.product_name}</div>
                  <div style={{ fontSize:12, color:'#666' }}>{it.quantity} × ₹{it.price}</div>
                </div>
              </div>
              <div style={{ fontWeight:700 }}>{formatRupee((Number(it.price)||0) * (Number(it.quantity)||0))}</div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, fontWeight: 800, fontSize:16 }}>
            <div>Total Paid</div>
            <div>{formatRupee(order.total)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt
