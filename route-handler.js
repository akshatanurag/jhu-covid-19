const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const resultRoutes = require('./routes/result')
const addNewRoutes = require('./routes/add-new')
const viewAllRoutes = require('./routes/view-all')
const errorPagesRoutes = require('./routes/error-pages')
const frontendRoutes = require('./routes/frontend')

module.exports = (app) => {
    app.use("/", loginRoutes)
    app.use("/",signupRoutes)
    app.use("/",resultRoutes)
    app.use("/",addNewRoutes)
    app.use("/",viewAllRoutes)
    app.use(frontendRoutes)
    app.use("/",errorPagesRoutes)


}