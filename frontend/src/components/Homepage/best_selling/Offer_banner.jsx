import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../../utils/api'
import samosa_banner from '../../../assets/samosa_banner.png'

const Offer_banner = () => {
    const [coupon, setCoupon] = useState(null)

    useEffect(() => {
        let mounted = true

        const loadCoupons = async () => {
            try {
                const response = await api.get('/coupons/active/')
                const items = response.data?.data || []
                if (mounted) setCoupon(items[0] || null)
            } catch (error) {
                console.error('Failed to load coupons', error)
            }
        }

        // initial load
        loadCoupons()

        // poll every 15 seconds so admin changes reflect quickly
        const id = setInterval(loadCoupons, 15000)

        return () => {
            mounted = false
            clearInterval(id)
        }
    }, [])

    return (
        <div className='offer-head'>
            <section className="offer-banner">
                <div className="offer-content">
                    <span>🍔 {coupon ? coupon.title : 'LIMITED OFFER'}</span>

                    <h1>Get <span>{coupon ? `${coupon.discount_percent}% OFF` : '20% OFF'}</span></h1>

                    <h2>{coupon ? coupon.description : 'On Your First Order'}</h2>

                    <p>
                        {coupon ? `Use code ${coupon.code} at checkout` : 'Fresh, Hot & Delicious Food Delivered Straight To Your Doorstep.'}
                    </p>

                    <button><Link to={'/Menu'} style={{ textDecoration: 'none', color: 'white' }}>Order Now</Link></button>

                </div>

                <div className="offer-image">
                    <img src={samosa_banner} alt="Burger" />
                </div>
            </section>
        </div>
    )
}

export default Offer_banner