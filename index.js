const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const authRouter = require('./routes/auth');

// Services
const connectDB = require("./services/database");

const app = express();

dotenv.config({ path: './.env' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on at http://localhost:${process.env.PORT}`);
})