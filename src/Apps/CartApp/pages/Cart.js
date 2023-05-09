import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem/CartItem'
import { Link } from 'react-router-dom'
import CartOverviewBox from '../components/CartOverviewBox/CartOverviewBox'

function Cart() {

  const { cart } = useSelector(state => state)

  return (
    <div className='CartBox'>
      {
        cart.length > 0
        &&
        <div className="CartItemsBox">
          {
            cart.map(cartItem => {
              return <CartItem key={cartItem.id} item={cartItem} cart={cart} />
            })
          }
        </div>
      }
      {cart.length > 0 && <CartOverviewBox />}
      {
        cart.length < 1
        &&
        <div className="emptyCartBox">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzibBVD9w_go7Ofo5BK44_ufJf_y7qQAoPKg&usqp=CAU" alt="Empty Cart" />
          <Link to="/">
            <button>
              Shop Products
            </button>
          </Link>
        </div>
      }
    </div>
  )
}

export default Cart
