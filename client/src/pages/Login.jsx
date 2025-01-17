import React, { useState, useContext } from 'react'
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const { theme, toggleTheme } = useContext(ThemeContext)

    console.log("context theme from Login.jsx: ", theme);
    console.log("context toggleTheme from Login.jsx: ", toggleTheme);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", formData);

            const token = response.data;

            localStorage.setItem("token", token);

            setMessage("Login successful!");
            navigate("/protected");
        } catch (error) {
            console.log(error);
            setMessage("Login failed!");
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <br />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}

            <div style={{ marginTop: "20px" }}>
                <ThemeToggle />
            </div>
        </div>
    )
}
