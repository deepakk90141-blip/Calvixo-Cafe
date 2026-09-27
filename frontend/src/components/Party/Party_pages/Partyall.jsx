// import { PartyFeatures, Partythemes, steps, Partypackages, ChoosePartyfeatures, PartygalleryImages } from '../../Homepage/best_selling/FoodCard'
import { PartyFeatures, Partythemes, steps, Partypackages, ChoosePartyfeatures, PartygalleryImages } from '../../AllDatas/AllDatas'
import React from "react";
import { FaCheckCircle, FaCalendarAlt, FaGlassCheers, FaArrowRight, FaGift, FaBirthdayCake } from "react-icons/fa";
import { GiPartyPopper, GiBalloons } from "react-icons/gi";
import Review from '../../Homepage/best_selling/Review'
// import BookParty from './BookParty';
import CalvixoLogo from '../../CalvixoLogo'
import { Link } from 'react-router-dom';


const Partyall = () => {
    return (
        <>
            <section className="party-hero">
                {/* Decorative Elements */}
                <div className="sparkle sparkle-1">✨</div>
                <div className="sparkle sparkle-2">✨</div>
                <div className="sparkle sparkle-3">✨</div>

                <GiBalloons className="balloon balloon-1" />
                <GiBalloons className="balloon balloon-2" />

                <FaGift className="gift gift-1" />
                <FaGift className="gift gift-2" />

                <div className="container">
                    {/* Left */}
                    <div className="hero-content">
                        <span className="hero-tag">
                            <GiPartyPopper />
                            Luxury Celebrations
                        </span>

                        <h1>
                            Celebrate Your
                            <br />
                            <span>Special Moments</span>
                            <br />
                            <div style={{ display: 'flex', gap: '12px' }}>With <CalvixoLogo width={260} height={80} /></div>

                        </h1>

                        <p>
                            Luxury birthday celebrations with premium decorations,
                            delicious food, live music, photography and unforgettable
                            memories.
                        </p>

                        <div className="feature-list">
                            {PartyFeatures.map((item, index) => (
                                <div className="feature-item" key={index}>
                                    <FaCheckCircle />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hero-buttons">
                            <button className="primary-btn">
                                <Link to={'/BookParty'} className="applyforjobbutton" style={{color:'#271407'}}>Book Your Party</Link>

                                <FaArrowRight />
                            </button>

                            <button className="secondary-btn">
                                View Packages
                            </button>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="hero-image">
                        <div className="circle-bg"></div>

                        <img
                            src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900"
                            alt="Birthday Celebration"
                        />

                        <FaBirthdayCake className="cake-icon" />

                        <div className="confetti confetti1"></div>
                        <div className="confetti confetti2"></div>
                        <div className="confetti confetti3"></div>
                        <div className="confetti confetti4"></div>
                    </div>
                </div>
            </section>

            {/* package section */}
            <section className="packages-section">
                <div className="container">
                    <div className="section-title">
                        <span>🎉 OUR PARTY PACKAGES</span>
                        <h2>Choose Your Celebration Package</h2>
                        <p>
                            Celebrate birthdays and special occasions with our premium party
                            packages.
                        </p>
                    </div>

                    <div className="packages-grid">
                        {Partypackages.map((pkg) => (
                            <div
                                className={`package-card ${pkg.popular ? "popular" : ""}`}
                                key={pkg.id}
                            >
                                {pkg.popular && <div className="badge">Most Popular</div>}

                                <div
                                    className="package-icon"
                                    style={{ background: pkg.color }}
                                />

                                <h3>{pkg.name}</h3>

                                <div className="price">{pkg.price}</div>

                                <ul>
                                    {pkg.features.map((item, index) => (
                                        <li key={index}>
                                            <FaCheckCircle />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <button>
                                    <Link to={'/BookParty'} className="applyforjobbutton">Book Your Party</Link>
                                    <FaArrowRight />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="why-section">
                <div className="container">

                    <div className="why-title">
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨ WHY CHOOSE With <CalvixoLogo width={110} height={35} /></span>
                        <h2>Make Your Celebration Extraordinary</h2>
                        <p>
                            Everything you need for a memorable luxury party experience.
                        </p>
                    </div>


                    <div className="why-grid">
                        {ChoosePartyfeatures.map((item, index) => (
                            <div className="why-card" key={index}>

                                <div className="why-icon">
                                    {item.icon}
                                </div>

                                <h3>
                                    {item.title}
                                </h3>

                            </div>
                        ))}
                    </div>

                </div>
            </section>


            <section className="gallery-section">

                <div className="container">

                    <div className="gallery-title">
                        <span>📸 GALLERY</span>
                        <h2>Memorable Moments At With <CalvixoLogo width={240} height={58} /></h2>
                        <p>
                            Explore our luxury celebrations, parties and unforgettable events.
                        </p>
                    </div>


                    <div className="masonry-gallery">

                        {PartygalleryImages.map((item) => (
                            <div
                                className="gallery-item"
                                key={item.id}
                            >
                                <img
                                    src={item.image}
                                    alt="Calvixo Event"
                                />

                                <div className="gallery-overlay">
                                    View Image
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>

            <section className="how-section">

                <div className="container">

                    <div className="how-title">
                        <span>✨ HOW IT WORKS</span>
                        <h2>Plan Your Perfect Celebration</h2>
                        <p>
                            Simple steps to create unforgettable memories.
                        </p>
                    </div>


                    <div className="steps-container">

                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>

                                <div className="step-card">

                                    <div className="step-number">
                                        {step.id}
                                    </div>

                                    <div className="step-icon">
                                        {step.icon}
                                    </div>

                                    <h3>
                                        {step.title}
                                    </h3>

                                    <p>
                                        {step.description}
                                    </p>

                                </div>


                                {index !== steps.length - 1 && (
                                    <div className="arrow">
                                        ↓
                                    </div>
                                )}

                            </React.Fragment>
                        ))}

                    </div>

                </div>

            </section>
            <div className="containers">


                <section className="reviews-section">
                    <div className="reviews-title">
                        <span>💬 CUSTOMER REVIEWS</span>
                        <h2>What Our Customers Say</h2>
                        <p>
                            Real celebrations, real memories from our happy customers.
                        </p>
                    </div>
                    <div className="review-inner">
                        <Review />
                    </div>
                </section>
            </div>

            <section className="themes-section">

                <div className="themes-container">

                    <div className="themes-title">
                        <span>🎭 AVAILABLE THEMES</span>
                        <h2>Choose Your Dream Party Theme</h2>
                        <p>
                            Create magical birthday moments with our creative themes.
                        </p>
                    </div>


                    <div className="themes-grid">

                        {Partythemes.map((theme, index) => (
                            <div className="theme-card" key={index}>

                                <img
                                    src={theme.image}
                                    alt={theme.title}
                                />

                                <div className="theme-overlay">

                                    <div className="theme-icon">
                                        {theme.emoji}
                                    </div>

                                    <h3>
                                        {theme.title}
                                    </h3>

                                    <button>
                                        Select Theme
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </section>


        </>
    )
}

export default Partyall