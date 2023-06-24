import React, { useEffect } from 'react'
import '../components/HomeComponents/Home.css'
import Hero from '../components/HomeComponents/Hero'
import Benifits from '../components/HomeComponents/Benifits'
import QuizesList from '../components/HomeComponents/QuizesList'
import { useDispatch, useSelector } from 'react-redux'
import { clearSuccessMsg, clearError } from '../Redux/Slices/UserSlice'
import { showToast } from '../configs/Toast'

const Home = () => {

  const dispatch = useDispatch()

  const { successMsg, error } = useSelector(state => state.user)

  useEffect(() => {
    if (successMsg) {
      showToast('success', successMsg, 5000)
    }
    if (error) showToast('error', error)

    dispatch(clearError())
    dispatch(clearSuccessMsg())
    
    // eslint-disable-next-line
  }, [successMsg, error])

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Benifits Section */}
      <Benifits />

      {/* Quizes Section */}
      <QuizesList />

    </>
  )
}

export default Home
