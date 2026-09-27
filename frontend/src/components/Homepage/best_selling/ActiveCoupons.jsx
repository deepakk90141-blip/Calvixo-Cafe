import { useEffect, useState } from 'react'
import api from '../../../utils/api'

const ActiveCoupons = () => {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const res = await api.get('/coupons/active/')
        const items = res.data?.data || []
        if (mounted) setCoupons(items)
      } catch (err) {
        console.error('Failed to load active coupons', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => { mounted = false }
  }, [])

  if (loading) return <div className="active-coupons">Loading offers...</div>
  if (!coupons.length) return null

  return (
    <div className="active-coupons" style={{marginTop:20, display:'none'}}>
      <h3>Active Offers</h3>
      <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
        {coupons.map((c) => (
          <div key={c.id} style={{padding:12, border:'1px solid #eee', borderRadius:8, minWidth:180}}>
            <strong>{c.title}</strong>
            <div>Code: {c.code}</div>
            <div>Discount: {c.discount_percent}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveCoupons
