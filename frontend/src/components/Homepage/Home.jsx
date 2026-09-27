
import React from 'react'
import Carousel from '../elements/Carousel'
import Cards from './Card/Cards'
import Best_items from './best_selling/best_items'
import Fast_functionality from './best_selling/Fast_functionality'
import Offer_banner from './best_selling/Offer_banner'
import Review from './best_selling/Review'
import ReviewForm from './best_selling/ReviewForm'
import ActiveCoupons from './best_selling/ActiveCoupons'

const Home = () => {
  return (
    <div className="home-shell">
        <section className="hero-spotlight">
          <div>
            <span className="section-badge">✨ Premium Dining Experience</span>
            <h1>Luxury food, curated daily, served with style.</h1>
            <p>From handcrafted menu items to handcrafted service, Calvixo brings the best of comfort and class right to your table.</p>
          </div>
        </section>
        <Carousel />
        <Cards />
        <Best_items />
        <Fast_functionality />
        <Offer_banner />
        <div style={{width:'100%', marginTop:'80px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'40px'}}><h1>❤️ What Our Customers Say</h1></div>
        <Review />
        <ReviewForm />
        <ActiveCoupons />
    </div>
  )
}

export default Home
