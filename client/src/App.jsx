import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'

export const ServerUrl = "https://interview-iq-9gk6.onrender.com"

function ProtectedRoute({ children }) {
  const { userData } = useSelector((state) => state.user)
  return userData ? children : <Navigate to="/" replace />
}

function App() {
  const dispatch = useDispatch()
  const [checkingAuth, setCheckingAuth] = React.useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        dispatch(setUserData(result.data))
      } catch (error) {
        dispatch(setUserData(null))
      } finally {
        setCheckingAuth(false)
      }
    }
    getUser()
  }, [dispatch])

  if (checkingAuth) return <div>Loading...</div>

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
      <Route path='/history' element={<ProtectedRoute><InterviewHistory /></ProtectedRoute>} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/report/:id' element={<ProtectedRoute><InterviewReport /></ProtectedRoute>} />

    </Routes>
  )
}

export default App