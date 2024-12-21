const express = require('express');
const {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} = require('../controllers/schedualController');

const router = express.Router();

router.route('/').get(getSchedules).post(createSchedule);
router.route('/:id').put(updateSchedule).delete(deleteSchedule);

module.exports = router;
