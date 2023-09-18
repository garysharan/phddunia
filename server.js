/** @format */

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cors = require('cors');

const app = express();
const db = require("./src/db/mongoose");

const userRouter = require("./src/routes/userRouter");
const categoryRouter = require("./src/routes/categoryRouter");
const streamRouter = require("./src/routes/streamRouter");
const courseDurationRouter = require("./src/routes/courseDurationRouter");
const cityRouter = require("./src/routes/cityRouter");
const stateRouter = require("./src/routes/stateRouter");
const countryRouter = require("./src/routes/countryRouter");
const courseRouter = require("./src/routes/courseRouter");
const instituteRouter = require("./src/routes/instituteRouter");
const enquiryRouter = require("./src/routes/enquiryRouter");


const server = http.createServer(app);
dotenv.config({
	path: "config.env"
});
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(userRouter);
app.use(categoryRouter);
app.use(streamRouter);
app.use(courseDurationRouter);
app.use(cityRouter);
app.use(stateRouter);
app.use(countryRouter);
app.use(courseRouter);
app.use(instituteRouter);
app.use(enquiryRouter);


server.listen(PORT, () => {
	console.log(`Listening server on Port:${PORT}`);
});