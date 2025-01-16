import React, { useState } from 'react'
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");

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
        </div>
    )
}
