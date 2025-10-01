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
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Comments from './pages/dashboard/Comments'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public Layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='login' element={
            <GuestRoute>
            <Login />
            </GuestRoute>
          } 
            />
          <Route path='register' element={
            <GuestRoute>
            <Register />
            </GuestRoute>
            } />

          <Route path='post/:id' element={
            <ProtectedRoute >
            <SinglePost />
            </ProtectedRoute>
            } />
          <Route path='profile' element={
            <ProtectedRoute >
            <Profile />
            </ProtectedRoute>
            } />
        </Route>

        {/* Admin Layout */}
        <Route path='/admin' element={
          <ProtectedRoute role="admin">
          <AdminLayout />
          </ProtectedRoute>
          }>
          <Route index element={<DashboardHome />} />
          <Route path='posts' element={<Post />} />
          <Route path='category' element={<Category />} />
          <Route path='users' element={<Users />} />
          <Route path='comment' element={<Comments />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster position='top-center'
     reverseOrder={false}/>
    </>

  )
}

export default App
