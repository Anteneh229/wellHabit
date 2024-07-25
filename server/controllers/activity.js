const Activity = require('../models/activity');

// GET /api/activities
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/activities/:id
exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (activity == null) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.json(activity);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/activities
exports.createActivity = async (req, res) => {
    const activity = new Activity({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });

    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT /api/activities/:id
exports.updateActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (activity == null) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        if (req.body.name != null) {
            activity.name = req.body.name;
        }

        if (req.body.description != null) {
            activity.description = req.body.description;
        }

        if (req.body.startDate != null) {
            activity.startDate = req.body.startDate;
        }

        if (req.body.endDate != null) {
            activity.endDate = req.body.endDate;
        }

        const updatedActivity = await activity.save();
        res.json(updatedActivity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /api/activities/:id
exports.deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (activity == null) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        await Activity.findByIdAndDelete(req.params.id);
        res.json({ message: 'Activity deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
