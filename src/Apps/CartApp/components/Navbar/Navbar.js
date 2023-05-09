import React from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Navbar() {

    const cart = useSelector(state => state.cart)

    return (
        <nav>
            <span className='nav-right logo'>
                Redux-Cart
            </span>
            <div className="nav-left">
                <ul>
                    <Link to={'/'}><li>Home</li></Link>
                    <Link to={'/cart'}><li>Cart</li></Link>
                </ul>
                <span className='cart-place'>
                    <Link to={'/cart'}>
                        <img src="https://cdn-icons-png.flaticon.com/512/10542/10542992.png" alt="cart" />
                    </Link>
                    <p className="cart-count">{cart.length}</p>
                </span>
            </div>
        </nav>
    )
}

export default Navbar
