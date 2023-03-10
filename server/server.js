const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const UserRouter= require('./routes/user')
require('./DB')
const app = express();
app.use(express.json());
app.use(cors());
app.use('/user',UserRouter)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
