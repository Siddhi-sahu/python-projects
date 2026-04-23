import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Optionally, verify token or get user info
    }
  }, [token])

  const login = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/login', { username, password })
      const { access_token } = res.data
      setToken(access_token)
      localStorage.setItem('token', access_token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      // Decode token to get user info, but for simplicity, assume username
      setUser({ username })
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.detail || 'Login failed' }
    }
  }

  const register = async (username, password) => {
    try {
      await axios.post('http://localhost:8000/api/v1/register', { username, password })
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.detail || 'Registration failed' }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
