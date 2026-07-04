import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import axiosInstance from './utils/axiosInstance'

export const ServerUrl = "https://interview-iq-9gk6.onrender.com"

function ProtectedRoute({ children, checkingAuth }) {
  const { userData } = useSelector((state) => state.user)
  if (checkingAuth) return null
  return userData ? children : <Navigate to="/" replace />
}

function App() {
  const dispatch = useDispatch()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axiosInstance.get("/api/user/current-user")
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      } finally {
        setCheckingAuth(false)
      }
    }
    getUser()

  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/interview' element={<ProtectedRoute checkingAuth={checkingAuth}><InterviewPage/></ProtectedRoute>}/>
      <Route path='/history' element={<ProtectedRoute checkingAuth={checkingAuth}><InterviewHistory/></ProtectedRoute>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<ProtectedRoute checkingAuth={checkingAuth}><InterviewReport/></ProtectedRoute>}/>
    </Routes>
  )
}

export default App