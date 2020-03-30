const { User } = require('../models/user');

const fetchUser = async token => {
    var findUser = await User.findOne({
      token: token
    }).select("-password")
    if (!findUser) return 0;
    return findUser;
  };

module.exports = {
    isLoggedIn: async(req,res,next)=>{
        try {
            if (!req.session.secure){
            //await res.redirect('/login')
            return res.render('auth/login', {alert: true, alertTitle: "Unauthorized", alertMessage: `Please login to continue`})
            }

            req.currentUser = await fetchUser(req.session.secure)
            if(req.currentUser!== 0 && req.currentUser.token === req.session.secure)
              next();
            else
            return res.render('auth/login', {alert: true, alertTitle: "Unauthorized", alertMessage: ` Invalid Session or token`})
          } catch (e) {
            console.log('Generated from isLoggedIn Middileware' + e);
            return res.render('auth/login', {alert: true, alertTitle: "Unauthorized", alertMessage: `Please login to continue`})

          }
    },
    isLoggedOut: async (req,res,next)=>{
        if(req.session.secure)
        res.redirect("/dashboard")
        else
        next()
    }
}