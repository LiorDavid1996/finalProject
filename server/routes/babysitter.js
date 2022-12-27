const express = require("express");
const router = express.Router();
const {createBabysitter}=require("../controllers/Babysitter")
router.post("/",createBabysitter)

module.exports = router;