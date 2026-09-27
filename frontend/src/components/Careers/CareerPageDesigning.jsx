import React, { useRef, useState } from "react";
// import './CareerPageDesigning.css';
import {
    FaUserTie,
    FaMotorcycle,
    FaCashRegister,
    FaPizzaSlice,
    FaHeadset,
    FaStar,
    FaMapMarkerAlt,
    FaClock,
    FaRupeeSign,
    FaArrowRight,
    FaCheckCircle,
    FaBriefcase,

} from "react-icons/fa";
import { GiChefToque, GiHamburger, } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import {
    CareerPageDesignstats,
    Careersteps,
    Careeejobs,
    Careerbenefits,
    Careerteam,
    Employeebenefits,
    Employeereviews,
    CareergalleryImages,
    Jobcities,
} from '../AllDatas/AllDatas'
import ApplyForJob from "../../AllForms/ApplyForJob";
import CalvixoLogo from "../CalvixoLogo";
import { Link, useNavigate } from "react-router-dom";

const features = [
    "Career Growth",
    // "Flexible Schedule",
    "Friendly Environment",
    // "Competitive Salary",
];


const CareerPageDesigning = () => {
    const [showApplyForm, setShowApplyForm] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const openApplyForm = () => {
        setShowApplyForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    };

    return (
        <div className="career-page-designing">
            <section className="career-hero">

                {/* Floating Icons */}
                <GiHamburger className="float burger" />
                <MdDeliveryDining className="float delivery" />
                <GiChefToque className="float chef-icon" />
                <span className="spark s1">✨</span>
                <span className="spark s2">✨</span>
                <span className="spark s3">✨</span>

                <div className="container">

                    {/* Left */}
                    <div className="career-content">

                        <span className="hero-badge">
                            <FaBriefcase />
                            Join Our Team
                        </span>

                        <h1 className="join-title">
                            Join The <span><CalvixoLogo width={280} height={80}></CalvixoLogo></span> Family
                        </h1>

                        <h2>
                            Build a Career That
                            <br />
                            Inspires Millions
                        </h2>


                        <div className="feature-list">
                            {features.map((item, index) => (
                                <div className="feature" key={index}>
                                    <FaCheckCircle />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hero-buttons">
                            <button className="primary-btn" onClick={openApplyForm}>
                                <Link to={'/ApplyForJob'} className="applyforjobbutton">Apply Now</Link>
                                <FaArrowRight />
                            </button>

                            <button className="secondary-btn">
                                Explore Jobs
                            </button>
                        </div>

                    </div>

                    {/* Right */}
                    <div className="career-image">

                        <div className="circle-bg"></div>

                        <img
                            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900"
                            alt="Chef"
                        />

                    </div>

                </div>

            </section>

            {showApplyForm && (
                <div ref={formRef} className="career-apply-form-wrapper">
                    <ApplyForJob />
                </div>
            )}

            <section className="company-stats">
                <div className="container">

                    {CareerPageDesignstats.map((item, index) => (
                        <div className="stat-card" key={index}>

                            <div className="stat-icon">
                                {item.icon}
                            </div>

                            <h2>{item.number}</h2>

                            <p>{item.title}</p>

                        </div>
                    ))}

                </div>
            </section>

            <section className="benefits-section">
                <div className="container">

                    <div className="section-title">
                        <span>WHY JOIN <span><CalvixoLogo width={120} height={40} /></span></span>
                        <h2>Employee Benefits</h2>
                        <p>
                            We value our people and provide everything they need to build a successful career.
                        </p>
                    </div>

                    <div className="benefits-grid">
                        {Careerbenefits.map((item, index) => (
                            <div className="benefit-card" key={index}>

                                <div className="benefit-icon">
                                    {item.icon}
                                </div>

                                <h3>{item.title}</h3>

                                <p>{item.desc}</p>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="jobs-section">
                <div className="container">

                    <div className="section-title">
                        <span>CAREER OPPORTUNITIES</span>
                        <h2>Current Open Positions</h2>
                        <p>
                            Join our growing team and build your future with Calvixo.
                        </p>
                    </div>

                    <div className="jobs-grid">
                        {Careeejobs.map((job, index) => (
                            <div className="job-card" key={index}>

                                <div className="job-top">
                                    <div className="job-icon">
                                        {job.icon}
                                    </div>

                                    <h3>{job.title}</h3>
                                </div>

                                <div className="job-info">

                                    <span>
                                        <FaMapMarkerAlt />
                                        {job.location}
                                    </span>

                                    <span>
                                        <FaClock />
                                        {job.type}
                                    </span>

                                    <span>
                                        <FaRupeeSign />
                                        {job.salary}
                                    </span>

                                </div>

                                <button onClick={openApplyForm}>
                                    <Link to={'/ApplyForJob'} className="applyforjobbutton">Apply Now</Link>
                                    <FaArrowRight />
                                </button>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="process-section">
                <div className="container">

                    <div className="section-title">
                        <span>HIRING PROCESS</span>
                        <h2>How We Hire</h2>
                        <p>
                            A simple and transparent recruitment process designed for everyone.
                        </p>
                    </div>

                    <div className="process-wrapper">
                        {Careersteps.map((step, index) => (
                            <React.Fragment key={step.id}>

                                <div className="process-card">

                                    <div className="step-number">
                                        {step.id}
                                    </div>

                                    <div className="step-icon">
                                        {step.icon}
                                    </div>

                                    <h3>{step.title}</h3>

                                    <p>{step.desc}</p>

                                </div>

                                {index !== Careersteps.length - 1 && (
                                    <div className="process-line"></div>
                                )}

                            </React.Fragment>
                        ))}
                    </div>

                </div>
            </section>


            <section className="team-section">
                <div className="container">

                    <div className="section-title">
                        <span>OUR AMAZING TEAM</span>
                        <h2>Meet The People Behind Calvixo</h2>
                        <p>
                            Passionate professionals working together to create unforgettable experiences.
                        </p>
                    </div>

                    <div className="team-grid">

                        {Careerteam.map((member, index) => (

                            <div className="team-card" key={index}>

                                <img
                                    src={member.image}
                                    alt={member.name}
                                />

                                <div className="team-content">

                                    <div className="team-icon">
                                        {member.icon}
                                    </div>

                                    <h3>{member.name}</h3>

                                    <p>{member.desc}</p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            </section>

            <section className="employee-benefits">
                <div className="container">

                    <div className="section-title">
                        <span>WHY WORK WITH US</span>
                        <h2>Employee Benefits</h2>
                        <p>
                            We care about our people and provide benefits that help them grow
                            professionally and personally.
                        </p>
                    </div>

                    <div className="benefits-grid">
                        {Employeebenefits.map((item, index) => (
                            <div className="benefit-card" key={index}>

                                <div className="benefit-icon">
                                    {item.icon}
                                </div>

                                <div className="benefit-info">
                                    <FaCheckCircle className="check-icon" />
                                    <h3>{item.title}</h3>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="employee-reviews">
                <div className="container">

                    <div className="section-title">
                        <span>EMPLOYEE TESTIMONIALS</span>
                        <h2>Hear From Our Team</h2>
                        <p>
                            Real stories from the people who make Calvixo special every day.
                        </p>
                    </div>

                    <div className="reviews-grid">

                        {Employeereviews.map((item) => (
                            <div className="review-card" key={item.id}>

                                <div className="employee-info">

                                    <img src={item.image} alt={item.name} />

                                    <div>
                                        <h4>{item.name}</h4>
                                        <span>{item.role}</span>
                                    </div>

                                </div>

                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <p>"{item.review}"</p>

                            </div>
                        ))}

                    </div>

                </div>
            </section>

            <section className="office-gallery">

                <div className="container">

                    <div className="section-title">
                        <span>OFFICE GALLERY</span>
                        <h2>Life At Calvixo</h2>
                        <p>
                            A glimpse of our workplace, team moments and daily celebrations.
                        </p>
                    </div>


                    <div className="gallery-grid">

                        {CareergalleryImages.map((item, index) => (

                            <div
                                className={`gallery-item item-${index + 1}`}
                                key={index}
                            >

                                <img
                                    src={item.image}
                                    alt={item.title}
                                />

                                <div className="gallery-overlay">
                                    <h3>{item.title}</h3>
                                </div>

                            </div>

                        ))}

                    </div>


                </div>

            </section>

            <section className="locations-section">

                <div className="container">

                    <div className="section-title">
                        <span>OUR LOCATIONS</span>
                        <h2>Join Calvixo Near You</h2>
                        <p>
                            Explore career opportunities across our growing cities.
                        </p>
                    </div>


                    <div className="locations-grid">

                        {Jobcities.map((city, index) => (

                            <div className="location-card" key={index}>

                                <div className="location-icon">
                                    <FaMapMarkerAlt />
                                </div>

                                <h3>
                                    {city}
                                </h3>

                                <button className="applyforjobbutton" style={{display:'inline-flex', alignItems:'center', gap:8}} onClick={() => navigate(`/Careers/${encodeURIComponent(city)}`)}>
                                    View Jobs
                                    <FaArrowRight />
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            </section>
        </div>
    )
}

export default CareerPageDesigning