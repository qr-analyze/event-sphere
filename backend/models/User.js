const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "organizer", "exhibitor", "attendee"], default: "attendee" },
});

// Password hashing before saving a user
userSchema.pre("save", async function (next) {
    // Ensure the password is hashed only when it is new or modified
    if (this.isModified("password")) {
        try {
            // Hash the password before saving it
            this.password = await bcrypt.hash(this.password, 10);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Method to compare the provided password with the stored password hash
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("User", userSchema);
