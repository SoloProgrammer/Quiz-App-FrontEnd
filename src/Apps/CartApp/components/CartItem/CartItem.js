import React from 'react'
import './CartItem.css'
import { ChangeQuantity, removeFromCart } from '../../Redux/Slices/CartSlice'
import { useDispatch } from 'react-redux'

function CartItem({ item, cart }) {
    const dispatch = useDispatch()
    const handleChange = (e) => {
        let data = cart.filter(i => i.id === item.id)
        let newItem = { ...data[0] }
        newItem.qty = e.target.value
        dispatch(ChangeQuantity({ id: item.id, qty:e.target.value}))
    }
    return (
        <div className='cartItem'>
            <div className="left-side">
                <div className="img">
                    <img src={item.thumbnail} alt="" />
                </div>
                <div className="details">
                    <h4 className='title'>{item.title}</h4>
                    <div className="brand">
                        <span className='font200'>Brand:</span>
                        <p className="brandname font100">{item.brand}</p>
                    </div>
                    <p className='green200 bold font200'>{item.discountPercentage}% off</p>
                    <p className='font200'>{item.stock > 0 && "In Stock"}</p>
                </div>
                <div className="">
                    <h4 className='bold mb_2'>Price</h4>
                    <p>₹ {item.price}</p>
                </div>
            </div>
            <div className="right-side">
                <div className="upper">
                    <div className="qty">
                        <p className='mb_2'>Quantity</p>
                        <select onChange={handleChange} name="qtyselect" id="" disabled={!item.stock} value={item.qty}>
                            {
                                Array.from({ length: item.stock }).fill(false).map((_, i) => {
                                    return <option key={i} value={i + 1}>{i + 1}</option>
                                })
                            }
                        </select>
                    </div>
                    <p className="total ">
                        <h4 className='mb_2'>Total</h4>
                        <p>₹ {item.qty * item.price}</p>
                    </p>
                </div>
                <div className="bottom" onClick={() => dispatch(removeFromCart(item.id))}>
                    <span>
                        REMOVE &nbsp;<i className="fa-solid fa-trash"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CartItem
