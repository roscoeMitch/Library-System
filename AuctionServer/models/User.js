const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    uniqure: true,
  },
  isMember: {
    type: Boolean,
    required: true,
    default: false,
  },
  ticketList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Ticket",
    },
  ],
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bids",
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

//module.exports = mongoose.model("User", userSchema);
const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    password: passwordComplexity().required().label("Password"),
    email: Joi.string().required().label("Email"),
    isMember: Joi.string().required().label("Is Member"),
  });
  return schema.validate(data);
};
module.exports = { User, validate };
