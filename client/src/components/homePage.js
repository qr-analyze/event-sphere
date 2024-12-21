// HomePage.js
import React from "react";
import NavbarComponent from "./Navbar";  // Import the NavbarComponent

const HomePage = () => {
    return (
        <div>
            {/* Include Navbar on every page */}
            <NavbarComponent />

            {/* Main Content */}
            <div className="container">
                <h2>HomePage</h2>
            </div>
        </div>
    );
};

export default HomePage;
