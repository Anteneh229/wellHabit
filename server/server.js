const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Routes
const activityRoutes = require('./routes/activity');
const userRoutes = require('./routes/user');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to Mongo DB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes);

app.use('/api/data', (req, res) => {
    res.status(200).json({message: 'Hello From the Backend'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
