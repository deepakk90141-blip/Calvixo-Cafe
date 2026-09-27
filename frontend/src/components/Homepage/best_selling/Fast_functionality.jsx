// import { features } from './FoodCard'
import {features} from '../../AllDatas/AllDatas'

const Fast_functionality = () => {
    return (
        <div className='fast_functionality'>
            {
                features.map((item) => (
                    <div className="feature-card" key={item.id}>
                        <div className="icon">{item.icon}</div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Fast_functionality