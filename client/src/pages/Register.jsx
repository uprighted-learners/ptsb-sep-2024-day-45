import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ThemeToggle from '../components/ThemeToggle'

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/register", formData)
            setMessage("Registration successful!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            setMessage("Registration failed!" + error.message);
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
            <h1>Register</h1>
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

                <button type="submit">Register</button>
            </form>
            <p>{message}</p>

            <div style={{ marginTop: "20px" }}>
                <ThemeToggle />
            </div>
        </div>
    );
}
