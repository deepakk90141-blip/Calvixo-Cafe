import React from "react";
import Review from "../../Homepage/best_selling/Review";
import CalvixoLogo from '../../CalvixoLogo'
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">

        {/* Background Circles */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>

        <div className="hero-container">

          {/* Left Content */}
          <div className="hero-content">

            <div className="hero-badge">
              🚚 Fast Delivery
            </div>

            <h1 className="hero-title">
              Delicious Food
              <br />
              <span>Delivered To Your Door</span>
            </h1>

            <p className="hero-description">
              Order your favorite meals from the best restaurants in your city.
              Fresh ingredients, lightning-fast delivery, and live order tracking.
            </p>

            <div className="hero-buttons" style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              <button className="btn btn-primary btn-lg" style={{ borderRadius: 8, padding: '10px 18px' }}><Link to={'/Menu'} style={{ textDecoration: 'none', color: 'white' }}>Order Now</Link></button>
              <button className="btn btn-outline-secondary btn-lg" style={{ borderRadius: 8, padding: '10px 18px' }}>Track Order</button>
            </div>

            <div className="hero-features">
              <div className="feature">✅ 30 Min Delivery</div>
              <div className="feature">✅ Fresh Food</div>
              <div className="feature">✅ Live Tracking</div>
            </div>

          </div>

          {/* Right Image */}
          <div className="hero-image">

            <div className="food burger">🍔</div>
            <div className="food pizza">🍕</div>
            <div className="food momos">🥟</div>

            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="Delivery Boy"
              className="delivery-boy"
            />

          </div>

        </div>

      </section>

      {/* Statistics Section */}
      <section className="statistics">

        <div className="stats-container">

          <div className="stat-card">
            <h2>120K+</h2>
            <p>Orders Delivered</p>
          </div>

          <div className="stat-card">
            <h2>30 Min</h2>
            <p>Average Time</p>
          </div>

          <div className="stat-card">
            <h2>50+</h2>
            <p>Cities Covered</p>
          </div>

          <div className="stat-card">
            <h2>★ 4.9</h2>
            <p>Customer Rating</p>
          </div>

        </div>

        <div className="choose-heading">
          <span>Why Choose</span>
          <h1><CalvixoLogo width={250} height={70} /></h1>
        </div>

        {/* ================= WHY CHOOSE CALVIXO ================= */}

        <section className="why-choose">

          <div className="section-title">
            <p>
              Experience the fastest and most reliable food delivery with premium
              service and exciting offers.
            </p>
          </div>

          <div className="choose-grid">

            <div className="choose-card">
              <div className="choose-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Hot & fresh food delivered within 30 minutes.</p>
            </div>

            <div className="choose-card">
              <div className="choose-icon">📦</div>
              <h3>Safe Packaging</h3>
              <p>Hygienic and secure packaging for every order.</p>
            </div>

            <div className="choose-card">
              <div className="choose-icon">💳</div>
              <h3>Easy Payment</h3>
              <p>Pay using UPI, Cards, Wallets or Cash on Delivery.</p>
            </div>

            <div className="choose-card">
              <div className="choose-icon">📍</div>
              <h3>Live Tracking</h3>
              <p>Track your order in real-time from kitchen to doorstep.</p>
            </div>

            <div className="choose-card">
              <div className="choose-icon">🛵</div>
              <h3>Expert Riders</h3>
              <p>Professional delivery partners ensuring safe delivery.</p>
            </div>

            <div className="choose-card">
              <div className="choose-icon">🎁</div>
              <h3>Best Offers</h3>
              <p>Exclusive discounts and cashback on every order.</p>
            </div>

          </div>

        </section>
        {/* ================= HOW IT WORKS ================= */}

        <section className="how-it-works">

          <div className="section-title">
            <span>How It Works</span>
            <h2>Get Your Food in 5 Easy Steps</h2>
            <p>
              Ordering delicious food has never been easier. Just follow these
              simple steps and enjoy your meal.
            </p>
          </div>

          <div className="timeline">

            <div className="timeline-step">
              <div className="timeline-icon">🛒</div>
              <h3>Place Order</h3>
            </div>

            <div className="timeline-step">
              <div className="timeline-icon">👨‍🍳</div>
              <h3>Chef Cooks</h3>
            </div>

            <div className="timeline-step">
              <div className="timeline-icon">📦</div>
              <h3>Food Packing</h3>
            </div>

            <div className="timeline-step">
              <div className="timeline-icon">🛵</div>
              <h3>Rider Pickup</h3>
            </div>

            <div className="timeline-step">
              <div className="timeline-icon">🏠</div>
              <h3>Delivered Home</h3>
            </div>

          </div>

        </section>

        {/* ================= DELIVERY LOCATIONS ================= */}

        <section className="delivery-locations">

          <div className="section-title">
            <span>📍 We Deliver Here</span>
            <h2>Serving Across Major Cities</h2>
            <p>
              Fast delivery is available in multiple cities with more locations
              coming soon.
            </p>
          </div>

          <div className="locations-wrapper">

            {/* Cities */}
            <div className="cities-grid">

              <div className="city-card">Lucknow</div>
              <div className="city-card">Kanpur</div>
              <div className="city-card">Noida</div>
              <div className="city-card">Delhi</div>
              <div className="city-card">Agra</div>
              <div className="city-card">Varanasi</div>
              <div className="city-card">Prayagraj</div>
              <div className="city-card">Gorakhpur</div>

            </div>

            {/* Optional India Map */}
            <div className="map-area">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGw5Sj73ndKGNQ1Llsq8yEGLyVrfMcASjRjNmR_Wl3w&s=10"
                alt="India Map"
                className="india-map"
              />
            </div>

          </div>

        </section>
        {/* ================= SPECIAL OFFER ================= */}

        <section className="special-offer">

          <div className="offer-card">

            <div className="offer-icon">
              🎉
            </div>

            <h2>20% OFF First Order</h2>

            <p>
              Use the coupon below and enjoy delicious food at a special price.
            </p>

            <div className="coupon">
              WELCOME20
            </div>

            <button className="offer-btn">
             <Link to={'/Menu'} style={{ textDecoration: 'none',color:'#F88D2B' }}>Order Now</Link>
            </button>

          </div>

        </section>
        {/* ================= CUSTOMER REVIEWS ================= */}

        <div className="section-title">
          <span>Customer Reviews</span>
          <h2>What Our Customers Say</h2>
        </div>
        <section className="reviews">
          <Review />
        </section>


        {/* ================= DOWNLOAD APP ================= */}

        <section className="download-app">

          <div className="download-container">

            {/* Phone Mockup */}
            <div className="phone-area">

              <div className="phone">

                <div className="phone-screen">

                  <div className="app-logo">
                    🍔
                  </div>

                  <h3>
                    <CalvixoLogo width={180} height={55} />
                  </h3>

                  <p>
                    Fast Food Delivery
                  </p>

                </div>

              </div>

            </div>


            {/* Content */}
            <div className="download-content">

              <span>
                📱 Download App
              </span>

              <h2>
                Get <span><CalvixoLogo width={230} height={70} /> </span> App
              </h2>
              <h2 style={{ padding: '0px', margin: '0px' }}>
                <br />
                Order Faster
              </h2>

              <p>
                Download our mobile app and enjoy quick ordering,
                live tracking and exclusive offers.
              </p>


              <div className="store-buttons">

                <button className="store-btn">
                  ▶
                  <div>
                    <small>GET IT ON</small>
                    <strong>Google Play</strong>
                  </div>
                </button>


                <button className="store-btn">
                  
                  <div>
                    <small>Download on</small>
                    <strong>App Store</strong>
                  </div>
                </button>

              </div>


              {/* QR Code */}

              <div className="qr-box">

                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Calvixo"
                  alt="QR Code"
                />

                <p>
                  Scan to Download
                </p>

              </div>


            </div>

          </div>

        </section>

      </section >
    </>
  );
};

export default HeroSection;