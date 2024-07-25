const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const activityController = require('../controllers/activity');

// define the routes (GET, POST, PUT, DELETE)
router.get('/', authMiddleware,  activityController.getAllActivities);
router.get('/:id',authMiddleware,  activityController.getActivityById);
router.post('/',authMiddleware,  activityController.createActivity);
router.put('/:id',authMiddleware,  activityController.updateActivity);
router.delete('/:id', authMiddleware, activityController.deleteActivity);


module.exports = router;