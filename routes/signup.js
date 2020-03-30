const express = require('express')
const {  User, validate} = require('../models/user')
const middleware = require('../middlewares/middleware')



const router = express.Router()

router.get("/register",middleware.isLoggedOut,(req,res)=>{
    res.render("auth/register",{alert: "success", alertTitle: "error", alertMessage: `sddsc`})
})

router.post('/register',middleware.isLoggedOut,async (req, res) => {
    try {  
        const submittedUser = {name,email,password} = req.body
  
        const { error } = await validate(submittedUser);
        if (error)
        return res.render('auth/register', {alert: true, alertTitle: "Type Error", alertMessage: `${error.details[0].message}`})
        //console.log(error.details[0].message)
        
      if (await User.findOne({email: submittedUser.email})) {
        return res.render('auth/register', {alert: true, alertTitle: "Opps...", alertMessage: `Email Taken`})

      }
   
  
      var user = new User({
        name: submittedUser.name,
        email: submittedUser.email
      });
  
      user.password = await user.generateHash(submittedUser.password);
      user.token = await user.generateAuthToken(submittedUser.email);
        
      await user.save();
      return await res.render("auth/register",{alert: false, alertTitle: "Congratulations!", alertMessage: `Signup successful`})

    //   res.header('x-auth-token', token).send({
    //       success: true,
    //       message: 'Sign up successful'
    //   });
  
    } catch (error) {
      return res.render('auth/register', {alert: true, alertTitle: "Opps...", alertMessage: `Something went wrong`})

    }
  });

module.exports = router