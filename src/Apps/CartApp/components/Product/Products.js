import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import './Products.css'

function Products() {
  const {products} = useSelector(state => state.products)
  
  console.log(products);
  return (
    <div className="products">
    {products.map((prod) => {
      return <ProductCard key={prod.id} prod={prod} />;
    })}
  </div>
  )
}

export default Products

