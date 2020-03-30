const express= require('express')

const router = express.Router()

router.get("/",(req,res)=>{
    res.redirect("/index.html")
})

router.get("/index.html",(req,res)=>{
    res.render("index")
})
router.get("/about.html",(req,res)=>{
    res.render("about")
})
router.get("/contact.html",(req,res)=>{
    res.render("contact")
})
router.get("/covidtest.html",(req,res)=>{
    res.render("covidtest")
})
router.get("/doctors.html",(req,res)=>{
    res.render("doctors")
})
router.get("/news.html",(req,res)=>{
    res.render("news")
})
router.get("/selfdiagnosis.html",(req,res)=>{
    res.render("selfdiagnosis")
})
router.get("/services.html",(req,res)=>{
    res.render("services")
})


module.exports = router