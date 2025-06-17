const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize app
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require('./models/userModel/userRoutes');
const electionRoutes = require('./models/electionModel/electionRoutes');
app.use('/v1', userRoutes);
app.use('/v1', electionRoutes);

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
};

// Start the server after DB connects
const PORT = process.env.PORT || 5678;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
