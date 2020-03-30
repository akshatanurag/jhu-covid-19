const express = require('express')
const middleware = require('../middlewares/middleware')

const {patient} = require('../models/patients')


const router = express.Router()

router.get("/result/:id",middleware.isLoggedIn,async (req,res)=>{
    let pateintDetails = await patient.findById(req.params.id)
    res.render("individual-result",{pateintDetails})
})

module.exports = router