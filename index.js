const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors());

// server production build in "/client/dist" folder
app.use(express.static("client/dist"))

// 8. authentication middleware
const authMiddleware = async (req, res, next) => {
    try {
        // create auth header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send('Unauthorized');
        }

        // Expecting a formate "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).send('Unauthorized');
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
    }
}

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI
).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

// 2. Define a schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// 4. Create a model
const User = mongoose.model('User', userSchema);

// 6. Create a route to register a new user
app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // create the new user
        const newUser = new User({
            username,
            password: await bcrypt.hash(password, 10)
        })

        // save the user to the database
        await newUser.save();

        // return successful message
        res.status(201).send('User created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('error registering user');
    }
})

// 7. Create a route to login a user
app.post("/api/login", async (req, res) => {
    try {
        // destruct the username and password from the request body
        const { username, password } = req.body;

        // find the user in the database
        const user = await User.findOne({ username });
        // if the user doesn't exist, return an error
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // if the user exists, compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        // if the password doesn't match, return an error
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }

        // if the password matches, generate a json web token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // return the token
        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.status(500).send('error logging in');
    }
});

// 9. protected route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.status(200).send('YOU ARE AUTHORIZED');
});

app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});