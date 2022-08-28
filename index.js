const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const categoryRoute = require('./routes/category');
const newsRoute = require('./routes/news')
const eventRoute = require('./routes/event')
const hostRoute = require('./routes/host')
const formData = require('express-form-data')
const notificationRoute = require('./routes/notification')
const ticketRoute = require('./routes/tickets')
const payRoute = require('./routes/pay')
//const fetch = require('node-fetch')
require('dotenv').config()


// DB Connection
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("Database is not connected");
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected");
});

// MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(formData.parse());
// Basic Testing Purposes
app.get("/", (req, res) => {
  res.json({
    author: "David Ezeh",
    stack: ["Nodejs", "Mongodb", "express"],
    project_name: "Busa auth"
  });
});

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const emailSubscriberRoutes = require("./helper/sendEmail");

// Use Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
//app.use("/api", emailSubscriberRoutes);
app.use('/api/category',categoryRoute)
app.use('/api/news', newsRoute)
app.use('/api/event',eventRoute)
app.use('/api/host',hostRoute)
app.use('/api/notification',notificationRoute);
app.use('/api/tickets',ticketRoute)
app.use('/api/paystack',payRoute)
// PORT
const port = 6521;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
