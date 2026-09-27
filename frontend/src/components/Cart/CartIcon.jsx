import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CartIcon = () => {
    return (
        <div>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
                <div style={{
                    position: 'fixed',
                    right: '50px',
                    bottom: '60px',
                    zIndex: '100',
                    fontSize: '30px',
                    padding: '20px',
                    cursor: 'pointer',
                    background: "#FF5722",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <FaShoppingCart />
                </div>
            </Link>
        </div>
    )
}

export default CartIcon