const express = require('express')

const middleware = require('../middlewares/middleware')

const {patient} = require('../models/patients')


const router = express.Router()

router.get("/dashboard",middleware.isLoggedIn,async (req,res)=>{
    let patientArray = await patient.find({user_id: req.currentUser._id})
    res.render("view-all",{patientArray,m: req.currentUser})
})

module.exports = router