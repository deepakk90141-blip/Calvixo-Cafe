import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const fallbackImages = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
    "https://images.unsplash.com/photo-1515003198219-avi4c0d1e6b?w=1200",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200",
];

const Carousel = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/menus/public/")
            .then((response) => setItems(response.data?.data?.slice(0, 3) || []))
            .catch((error) => console.error(error));
    }, []);

    const slides = items.length ? items : fallbackImages.map((image_url, index) => ({ image_url, name: ["Momos", "Manchurian", "Samosa"][index] }));

    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {slides.map((item, index) => (
                    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={item.id || item.image_url}>
                        <div className="carousel-image-container">
                            <img src={item.image_url} className="d-block w-100" alt={item.name} />

                            <div className="carousel-content">
                                <h1>Steamed to Perfection, Served with Love</h1>
                                <p>Fresh • Hot • Tasty</p>
                                <button className="btn btn-danger pb-2 pt-2 p-4"><Link to={'/Menu'} style={{ textDecoration: 'none', color: 'white' }}>Order Now</Link></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon"></span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    );
};

export default Carousel;