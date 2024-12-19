const logoutUser = (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }

    // Add the token to the blacklist to invalidate it
    tokenBlacklist.add(token);

    res.status(200).json({ message: "Logout successful" });
};
