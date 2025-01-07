const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(request, response) {
    try {
        const { email, password } = request.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "User not found",
                error: true,
            });
        }

        // Verify password
        const verifyPassword = await bcryptjs.compare(password, user.password);
        if (!verifyPassword) {
            return response.status(400).json({
                message: "Invalid email or password",
                error: true,
            });
        }

        // Create JWT token
        const tokenData = {
            id: user._id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: "1d" });

        return response.status(200).json({
            message: "Login successful",
            success: true,
            token: token, // Include the Bearer prefix in the response
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
}

module.exports = login;
