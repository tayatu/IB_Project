const express = require('express');
const { getInterviews, scheduleInterview, editInterview } = require('../controllers/interview.controller');
const router = express.Router();

router.get('/getInterviews' , getInterviews);
router.get('/getInterviews/:id' , getInterviews);
router.post('/scheduleInterview' , scheduleInterview);
router.put('/editInterview/:id' , editInterview);
module.exports = router;

