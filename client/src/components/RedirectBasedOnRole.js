import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const RedirectBasedOnRole = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const decodedToken = jwt_decode(token);
        if (decodedToken.role === "admin" || decodedToken.role === "organizer") {
            navigate("/admin");
        } else if (decodedToken.role === "exhibitor") {
            navigate("/exhibitor");
        } else if (decodedToken.role === "attendee") {
            navigate("/attendee");
        }
    }, [navigate]);

    return <div>Redirecting...</div>;
};

export default RedirectBasedOnRole;
