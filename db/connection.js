const mongoose = require('mongoose')
mongoose.connect(`mongodb://ecell:ecellandnasa7890@13.232.96.228:27017/ecell`,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    //connected
    console.log("connected")
}).catch(()=>{
    console.log("DB not connected")
})

mongoose.Promise = global.Promise

module.exports = {
    mongoose
}