import React, { useMemo } from 'react'
import './CartOverviewBox.css'
import { useSelector } from 'react-redux'
import { ShippingCost, freeShippingCost } from '../../Redux/Slices/CartSlice';

function CartOverviewBox() {

    const { cart } = useSelector(state => state);

    let reducedSubTotal = useMemo(function SubTotal() {
        let total = cart.reduce((accum, it) => {
            accum += it.price * it.qty
            return accum
        }, 0)
        return total
    }, [cart])

    return (
        <div className='width30 CartOverviewBox'>
            <h3>Cart Summary</h3>
            <div className="detailsBox">
                <div className="left">
                    <p>SubTotal: </p>
                    <p>ShippingCost: </p>
                    <p>Estimated Total: </p>
                </div>
                <div className="right">
                    <p>₹ {reducedSubTotal}</p>
                    <p>₹ {reducedSubTotal < freeShippingCost ? ShippingCost : 0}</p>
                    <p>₹ {reducedSubTotal + (reducedSubTotal < freeShippingCost ? ShippingCost : 0)}</p>
                </div>
            </div>
            <p className='font100 py-1 '>
                {
                    (reducedSubTotal < freeShippingCost)
                    ?
                    <span>FREE SHIPPING ON ORDER OF <b>₹{freeShippingCost} & ABOVE</b></span>
                    :
                    <span className='font200 green200 flex inline-block justifycenter'> <p>Congratulation🎉 your free shipping is activated now!</p> <img className='width2' src="https://cdn-icons-png.flaticon.com/512/7245/7245083.png" alt="free shipping" /></span>
                }
            </p>
            {
                reducedSubTotal < freeShippingCost
                &&
                <p className='font100 '>
                    Your'e <b className='red200'>₹{freeShippingCost - reducedSubTotal}</b> away from free shipping!
                </p>
            }
            <button className='checkout_btn'>
                Checkout
            </button>
        </div>
    )
}

export default CartOverviewBox
