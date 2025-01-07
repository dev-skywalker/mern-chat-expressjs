async function logout(request, response) {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return response.status(400).json({
                message: "No token provided",
                error: true,
            });
        }
        return response.status(200).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = logout