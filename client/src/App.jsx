import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './pages/Protected'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
    return (
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
    )
}
