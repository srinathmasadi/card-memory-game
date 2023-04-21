const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoutes');
const gameRoute = require('./routes/gameRoute');
const adminRoute = require('./routes/adminRoute');
const path = require('path');

const app = express();

// Connect DB
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/user",userRoute);
app.use("/game",gameRoute);
app.use("/admin",adminRoute);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '/client', 'build', 'index.html'))
  );
}

// Declare port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
