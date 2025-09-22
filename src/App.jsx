import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from "./pages/Home"
import Register from './pages/Register'
import Login from './pages/Login'
import SinglePost from './pages/SinglePost'
import Profile from "./pages/Profile"
import DashboardHome from './pages/dashboard/DashboardHome'
import Post from "./pages/dashboard/Post"
import Category from "./pages/dashboard/Categories"
import Users from './pages/dashboard/Users'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='post/:id' element={<SinglePost />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        {/* Admin Layout */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path='posts' element={<Post />} />
          <Route path='category' element={<Category />} />
          <Route path='users' element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster position='top-center'
     reverseOrder={false}/>
    </>

  )
}

export default App
