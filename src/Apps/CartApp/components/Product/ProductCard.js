import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../Redux/Slices/CartSlice';

const ProductCard = ({ prod }) => {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart);

  function productExists(){
    return cart.map(c => c.id).includes(prod.id)
  }

  return (
    <div key={prod.id} className="product">
      <div className="prodImg">
        <img src={prod.thumbnail} alt="thumbnail" />
      </div>
      <h2 className="title">{prod.title}</h2>
      <div className="prodBottom">
        <p className="price">₹ {prod.price}</p>
        <p className="discount">-{prod.discountPercentage}%</p>
      </div>
      <div className="brand">
        <span>Brand:</span>
        <p className="brandname">{prod.brand}</p>
      </div>
      <button className={`btn ${productExists() && 'red200'}`} onClick={() => dispatch(!productExists() ? addToCart(prod) : removeFromCart(prod.id))}>
        {
          productExists() ? "Remove from cart" : "Add to cart"
        }
      </button>
    </div>
  );
};
export default ProductCard;