import { Link } from 'react-router-dom'
import componentMomos from '../../../assets/componentMomos.jpg'
const Momos_card = () => {
    return (
        <div>
            <div className="card-content">
                <div className="content">
                    <h1>Fresh & Delicious Momos</h1>
                    <p>
                        Experience the authentic taste of freshly steamed momos made with
                        premium ingredients. Every bite is packed with rich flavors and served
                        with our signature spicy chutney.
                    </p>
                    <button><Link to={'/Menu'} style={{textDecoration:'none', color:'white'}}>Order Now</Link></button>
                </div>

                <div className="image">
                    <img src={componentMomos} alt="Momos"/>
                </div>
            </div>
        </div>
    )
}

export default Momos_card