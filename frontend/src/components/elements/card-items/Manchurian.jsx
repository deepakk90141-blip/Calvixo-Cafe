import { Link } from 'react-router-dom'
import componentManchurian from '../../../assets/componentManchurian.jpg'

const Card_Manchurian = () => {
    return (
        <div>
            <div className="card-content">
                <div className="content">
                    <h1>Spicy & Flavorful Manchurian</h1>
                    <p>
                        Our delicious Manchurian is tossed in a rich Indo-Chinese sauce
                        with fresh vegetables, aromatic garlic, and flavorful spices.
                        Every bite delivers the perfect balance of sweetness, spice,
                        and irresistible taste.
                    </p>
                    <button><Link to={'/Menu'} style={{textDecoration:'none', color:'white'}}>Order Now</Link></button>

                </div>

                <div className="image">
                    <img src={componentManchurian} alt="Manchurian" />
                </div>
            </div>
        </div>)
}

export default Card_Manchurian