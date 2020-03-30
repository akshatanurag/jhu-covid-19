const express = require('express')
const middleware = require('../middlewares/middleware')
const axios = require('axios')

const {patient} = require('../models/patients')


const router = express.Router()

router.get("/result/:id",middleware.isLoggedIn,async (req,res)=>{
    try {
        let pateintDetails = await patient.findById(req.params.id)
        //console.log(pateintDetails.imageAddr)
        let a = await axios.post("http://localhost:5000/",{
            path: pateintDetails.imageAddr
        })
        //console.log(a.data.prediction)
        return res.render("individual-result",{pateintDetails,m: req.currentUser, prediction: a.data.prediction})
    } catch (error) {
        console.log(error)
        return res.redirect("back")
    }

})

module.exports = router