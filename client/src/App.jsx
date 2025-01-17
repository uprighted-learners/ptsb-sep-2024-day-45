import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './pages/Protected'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

export default function App() {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={theme === "light" ? "light" : "dark"}>
            <Router>
                <Routes>
                    {/* PUBLIC ROUTES */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* PRIVATE ROUTES */}
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute>
                                <Protected />
                            </ProtectedRoute>
                        }
                    >
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}
