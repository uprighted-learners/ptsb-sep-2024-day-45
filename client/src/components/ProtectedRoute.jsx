import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    // we check for a token in local storage
    const token = localStorage.getItem('token');

    // if there is no token, we redirect to the login page
    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        children
    )
}
