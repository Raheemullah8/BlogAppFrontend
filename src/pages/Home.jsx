import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Slider from '../components/Slider'
import CategoriesChips from '../components/CategoriesChips'
import RecentPosts from '../components/PostCard'
import PostCard from '../components/PostCard'



function Home() {

  return (
<>

<Slider/>
<CategoriesChips/>
<PostCard/>

</>
  )
}

export default Home