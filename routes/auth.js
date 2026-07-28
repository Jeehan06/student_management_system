const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const JWT_SECRET = "mysecretkey";

const usersFile = path.join(__dirname, "../data/users.json");

// Read users
function getUsers() {

    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, "[]");
    }

    const data = fs.readFileSync(usersFile, "utf8");

    return JSON.parse(data);

}

// Save users
function saveUsers(users) {

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );

}

// =======================
// Register
// =======================
router.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({
                message: "Username and password are required."
            });

        }

        const users = getUsers();

        const existingUser = users.find(
            user => user.username === username
        );

        if (existingUser) {

            return res.status(400).json({
                message: "Username already exists."
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword
        };

        users.push(newUser);

        saveUsers(users);

        res.status(201).json({
            message: "Registration successful."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// =======================
// Login
// =======================
router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const users = getUsers();

        const user = users.find(
            user => user.username === username
        );

        if (!user) {

            return res.status(401).json({
                message: "Invalid username or password."
            });

        }

        const valid = await bcrypt.compare(
            password,
            user.password
        );

        if (!valid) {

            return res.status(401).json({
                message: "Invalid username or password."
            });

        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful.",
            token
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;