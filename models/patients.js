// const validator = require("validator");
const mongoose = require("mongoose");
const joi = require("@hapi/joi");

var patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    minlength: 1,
    trim: true
  },
  age: {
      type: Number
  },
  gender: {
      type: String,
      maxlength: 1
  },
  mobile_no: {
      type: Number
  },
  imageAddr: {
      type: String
  },
  pid: {
      type: String,
      unique: true
  },
  user_id:{
    type: String,
  },
  points: []

});
mongoose.Promise = global.Promise;

function validateSchema(user) {
  const schema = joi.object().keys({
    name: joi
      .string()
      .min(1)
      .max(50)
      .required(),
    email: joi
      .string()
      .min(5)
      .max(255)
      .email(),
    gender: joi.string().valid('M','F','O').required(),
    mobile_no: joi.number().min(10),
    age: joi.number(),
    pid: joi.string(),
    imageAddr: joi.string()
    
  });
  return schema.validate(user);
}


var patient = mongoose.model("patient", patientSchema);

module.exports = {
patient,
  validate: validateSchema
};
