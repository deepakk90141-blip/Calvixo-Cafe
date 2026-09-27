import React from 'react'
import { Link } from 'react-router-dom'

const Navbar_Link = () => {
    return (
        <div>
            <Link to='/Home' >Home</Link>
            <Link to='/Menu' >Menu</Link>
            <Link to='/Delivery' >Delivery</Link>
            <Link to='/News' >News</Link>
            <Link to='/Party' >Parties</Link>
            <Link to='/Careers' >Careers</Link>
        </div>
    )
}

export default Navbar_Link