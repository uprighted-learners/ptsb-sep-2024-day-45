import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to our home page!</p>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <Link to="/protected">Protected</Link>
        </div>
    )
}
