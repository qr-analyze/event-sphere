const multer = require('multer');

// Set up multer to store files locally
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a timestamp to avoid filename conflicts
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
