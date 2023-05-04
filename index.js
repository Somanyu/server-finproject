const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

dotenv.config({ path: './.env' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on at http://localhost:${process.env.PORT}`);
})