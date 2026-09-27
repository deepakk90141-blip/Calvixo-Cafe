import React, { useEffect, useState } from 'react';
import { events, galleryImages } from '../../AllDatas/AllDatas';
import api from '../../../utils/api';

const LatestNews = () => {
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const response = await api.get('/news-blogs/public/');
                setNewsItems(response.data?.data || []);
            } catch (error) {
                console.error(error);
            }
        };
        loadNews();
    }, []);

    const [fromInp, setFromInp] = useState('')

    const SubmitHandler =(e)=>{
        e.preventDefault();
        setFromInp('')
        console.log('form submitted in latestNews');
        
        
    }

    return (
        <div className='latestnews'>
            <section className="latest-news">
                <div className="container">
                    {/* Section Header */}
                    <div className="section-header">
                        <span className="section-badge">📰 Latest News & Updates</span>

                        <h2>
                            Stay updated with the latest offers, food launches,
                            <br />
                            events and exciting announcements from
                            <span> Calvixo Cafe</span>.
                        </h2>
                    </div>

                    {/* Hero Card */}
                    <div className="hero-card">
                        <img
                            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80"
                            alt="Calvixo Cafe"
                        />

                        <div className="overlay">
                            <div className="breaking">
                                🔥 <span>Breaking News</span>
                            </div>

                            <h1>Grand Opening of Our New Branch in Lucknow</h1>

                            <p>
                                Celebrate with us as we open our newest Calvixo Cafe branch in
                                Lucknow. Enjoy exciting launch offers, delicious food, live music,
                                and exclusive surprises for all visitors.
                            </p>

                            <button>Read Full Story →</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News section */}
            <section className="latest-news-section">
                <div className="container">

                    {/* Section Title */}
                    <div className="news-title">
                        <h2>🆕 Latest News</h2>
                        <p>Discover what's new at Calvixo Cafe.</p>
                    </div>

                    {/* News Cards */}
                    <div className="news-grid">
                        {newsItems.map((item) => (
                            <div className="news-card" key={item.id}>
                                <div className="image-box">
                                    <img src={item.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'} alt={item.title} />
                                </div>

                                <div className="news-content">
                                    <span className="date">{new Date(item.created_at).toLocaleDateString()}</span>

                                    <h3>{item.title}</h3>

                                    <button className="read-btn">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            

            {/* Upcoming section */}
            <section className="ea-section">
                <div className="container">

                    {/* Upcoming Events */}
                    <div className="ea-card">
                        <div className="card-header">
                            <h2>🎉 Upcoming Events</h2>
                        </div>

                        <div className="event-list">
                            {events.map((event, index) => (
                                <div className="event-item" key={index}>
                                    <div
                                        className="event-icon"
                                        style={{ background: event.color }}
                                    >
                                        {event.icon}
                                    </div>

                                    <span>{event.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="ea-card">
                        <div className="card-header">
                            <h2>📢 Latest Announcements</h2>
                        </div>

                        <div className="announcement-list">
                            {events.map((item, index) => (
                                <div className="announcement-item" key={index}>
                                    <span className="check">✔</span>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Gallery section*/}
            <section className="gallery-section">
                <div className="container">
                    <div className="section-title">
                        <span>📷 Gallery Highlights</span>
                        <h2>Moments from Calvixo Cafe</h2>
                        <p>Food, fun, music, and unforgettable memories.</p>
                    </div>

                    <div className="gallery-grid">
                        {galleryImages.map((img, index) => (
                            <div className="gallery-item" key={index}>
                                <img src={img} alt={`Gallery ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subscribe section */}
            <section className="subscribe-section">
                <div className="container">
                    <div className="subscribe-box">
                        <h2>📬 Subscribe</h2>

                        <p>
                            Get the latest offers, food launches and events directly in your
                            inbox.
                        </p>

                        <form className="subscribe-form" onSubmit={(e)=>{SubmitHandler(e);
                        }}>
                            <input
                            value={fromInp}
                                onChange={(e)=>{
                                    setFromInp(e.target.value);                                    
                                }}
                                type="email"
                                placeholder="Enter your email address"
                            />

                            <button type="submit">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default LatestNews