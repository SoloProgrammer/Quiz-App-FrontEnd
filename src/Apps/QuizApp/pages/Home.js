import React from 'react'
import '../components/HomeComponents/Home.css'
import Hero from '../components/HomeComponents/Hero'
import Benifits from '../components/HomeComponents/Benifits'
import QuizesList from '../components/HomeComponents/QuizesList'

const Home = () => {

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Benifits Section */}
      <Benifits />

      {/* Quizes Section */}
      <QuizesList/>

    </>
  )
}

export default Home
