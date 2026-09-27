import { Link } from 'react-router-dom'
import componentSamosa from '../../../assets/componentSamosa.jpg'

const Card_Samosa = () => {
    return (
        <div>
            <div className="card-content">
                <div className="content">
                    <h1>Golden & Crispy Samosas</h1>
                    <p>
                        Enjoy our freshly fried samosas with a perfectly crispy crust
                        and a delicious potato filling blended with traditional Indian
                        spices. Served hot with tangy mint and tamarind chutneys for
                        the ultimate snack experience.
                    </p>
                    <button><Link to={'/Menu'} style={{ textDecoration: 'none', color: 'white' }}>Order Now</Link></button>
                </div>

                <div className="image">
                    <img src={componentSamosa} alt="Samosa" />
                </div>
            </div>
        </div>)
}

export default Card_Samosa