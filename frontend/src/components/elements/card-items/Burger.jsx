import { Link } from 'react-router-dom'
import componentBurger from '../../../assets/componentBurger.jpg'
const Card_Burger = () => {
    return (
        <div>
            <div className="card-content">
                <div className="content">
                    <h1>Juicy & Cheesy Burgers</h1>
                    <p>
                        Bite into our freshly grilled burgers loaded with juicy patties,
                        melted cheese, crisp vegetables, and our signature sauces.
                        Crafted with premium ingredients, every burger is made to
                 , color:'white'       satisfy your hunger and delight your taste buds.
                    </p>
                    <button><Link to={'/Menu'} style={{textDecoration:'none', color:'white'}}>Order Now</Link></button>
                </div>

                <div className="image">
                    <img src={componentBurger} alt="Burger" />
                </div>
            </div>
        </div>)
}

export default Card_Burger