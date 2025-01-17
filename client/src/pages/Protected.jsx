import React, { useState, useEffect } from 'react'
import api from "../services/api";
import ThemeToggle from '../components/ThemeToggle'

export default function Protected() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        api
            .get("/protected")
            .then((response) => setMessage(response.data))
            .catch((error) => setMessage(error.message))
    }, [])

    return (
        <div>
            <h1>Protected Page</h1>
            <p>{message}</p>

            <div style={{ marginTop: "20px" }}>
                <ThemeToggle />
            </div>
        </div>
    )
}
