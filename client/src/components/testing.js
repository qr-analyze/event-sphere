const bcrypt = require("bcrypt");

const hashedPassword = "$2b$10$RTeXBS4PjyLCbFo5kB6dAum8V7wyno2f.wkj9CWhbd1/6UZ7Atw2O"; // Replace with your hashed password
const plainPassword = "your_password_here"; // The password you want to test

bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
    if (err) throw err;
    console.log("Password match:", isMatch); // Should log true if passwords match
});
