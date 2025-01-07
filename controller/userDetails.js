const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

async function userDetails(request, response) {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return response.status(400).json({
                message: "No token provided",
                error: true,
            });
        }

        const user = await getUserDetailsFromToken(token)

        return response.status(200).json({
            message: "user details",
            data: user
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = userDetails