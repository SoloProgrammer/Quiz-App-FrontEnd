import React, { useEffect, useRef, useState } from 'react'
import Products from '../components/Product/Products';

import { useDispatch, useSelector } from 'react-redux'

import { fetchProducts } from '../Redux/Actions/ThunkActions'
import Pagination from '../components/Pagination/Pagination';
import '../CartApp.css'

function Home() {

  const { isLoading, totalProducts } = useSelector(state => state.products)

  const [currentPage, setCurrentPage] = useState(1);
  const LimitPerPage = 8;

  let FetchParams = { page: currentPage, LimitPerPage }

  const totalPages = useRef(0)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(FetchParams))
    // eslint-disable-next-line 
  }, [dispatch,FetchParams.page])

  totalPages.current = Math.ceil(totalProducts/LimitPerPage)

  useEffect(()=>{
    FetchParams.page = currentPage
    // eslint-disable-next-line
  },[currentPage])

  return (
    <div>
      {
        isLoading
        &&
        <div className="loader">
          <img src="https://dltqhkoxgn1gx.cloudfront.net/img/posts/6-vue-loader-animation-libraries-to-reduce-your-bounce-rate-2.png" alt="loading.." />
        </div>
      }
      {!isLoading && <Products />}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages.current}/>
    </div>
  )
}

export default Home
