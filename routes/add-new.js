const express = require('express')
const {patient,validate} = require('../models/patients')
const randomString = require('randomstring')
const middleware = require('../middlewares/middleware')
     

const router = express.Router()

router.get("/add-new",middleware.isLoggedIn,(req,res)=>{
    res.render("add-new",{alert: "", alertTitle: "error", alertMessage: `sddsc`,m: req.currentUser})
})
router.post("/add-new",middleware.isLoggedIn,async (req,res)=>{
    try {
        let pid = await randomString.generate(12);
        if (!req.files)
        return res.render('add-new', {alert: true, alertTitle: "Error", alertMessage: `No files were uploaded.`,m: req.currentUser})

      let sampleFile = await req.files.xray;
    //  console.log(sampleFile)
 
      if(sampleFile.mimetype === "image/jpeg" || sampleFile.mimetype === "image/png"){
          [name,ext]= await sampleFile.mimetype.split("/")
      sampleFile.mv(`./flask_server/uploads/${pid}.${ext}`, async function(err) {
        if (err){
        console.log(err)
        return res.render('add-new', {alert: true, alertTitle: "Error", alertMessage: `No files were uploaded.`,m: req.currentUser})
        }
        let patientInfo = {name,age,gender,email,mobile_no} = req.body 
        //console.log(patientInfo)
        const { error } = await validate(patientInfo);
        if (error)
        return res.render('add-new', {alert: true, alertTitle: "Error", alertMessage: `${error.details[0].message}`,m: req.currentUser})
        var Patient = new patient({
            name: patientInfo.name,
            age: patientInfo.age,
            gender: patientInfo.gender,
            email: patientInfo.email,
            mobile_no: patientInfo.mobile_no
        })
        Patient.pid = pid
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        Patient.imageAddr = `./uploads/${pid}.${ext}`
        Patient.user_id = req.currentUser._id
        Patient.points.push(130, 75, 65, 130, 110, 145, 155, 60, 145, 149, 170)
        await Patient.save();
        return await res.render("add-new",{alert: false, alertTitle: "Congratulations!", alertMessage: `Patient Added Successfully!`,m: req.currentUser})

    })
    } 
}catch (error) {
        console.log(error)
        return res.render('add-new', {alert: true, alertTitle: "Opps!...", alertMessage: `Something went wrong`,m: req.currentUser})
    }



})

module.exports = router