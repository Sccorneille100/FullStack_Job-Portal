const express = require("express");
const { signup } = require("../controllers/authcontroller");
const router = express.Router();

//
router.post('/signup', signup);


router.get('/', (req, res)=>{
    res.send("it is on");
} )


module.exports = router;