import { Link } from 'react-router-dom'


const Card_link = ({ setCategory }) => {
    return (
        <div className="anc-container">
            <button onClick={() => setCategory("momos")}>Momos</button>
            <h1>|</h1>

            <button onClick={() => setCategory("samosa")}>Samosa</button>
            <h1>|</h1>

            <button onClick={() => setCategory("manchurian")}>Manchurian</button>
            <h1>|</h1>

            <button onClick={() => setCategory("burger")}>Burger</button>
        </div>
    );
};


export default Card_link








// const Card_link = () => {
//     return (
//         <div>
//             <div className="anc-container">
//                 <Link to="/">Momos</Link><h1>|</h1>
//                 <Link to="Home/samosa">Samosa</Link><h1>|</h1>
//                 <Link to="Home/manchurian">Manchurian</Link><h1>|</h1>
//                 <Link to="Home/burger">Burger</Link>
//             </div>
//         </div>
//     )
// }





