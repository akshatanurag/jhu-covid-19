const express = require('express')

const router = express.Router()

router.get("*",(req,res)=>{
    res.render("error-404")
})
router.post("*",(req,res)=>{
    res.render("error-400")
})

module.exports = router