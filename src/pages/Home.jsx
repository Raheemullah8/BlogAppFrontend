import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
     <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold">Welcome to My Blog 🚀</h1>
      </div>
      <Footer/>
    </div>
  )
}

export default Home