const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validator = require("validator");
dotenv.config({ path: ".././src/config/config.env" });
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    //validation will be before saving to db
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "host", "cooker"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: Number,
  },
  emailVerificationTokenExpires: {
    type: Date,
  },
  passwordResetToken: {
    type: Number,
  },
  passwordResetTokenExpires: {
    type: Date,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },


  // fields for host and cooker
  avatar: {type: String, default: 'TODO'},
  coverImg: {type: String, default: 'TODO'},

  // optional: thinking about to get username from email : umer123@gmail.com as username: umer123
  // username: {type: String, default: 'No username required for now'},
  userDesc: {type: String, required: true},
  country: {type: String, required: true},
  timeZone: {type: String, required: true},
  websiteLink: {type: String, required: true},

  // bookmark 
  bookMark: [{
    title: {type: String, default: 'TODO'}
  }]
















});

//hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//jwtToken
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const user = mongoose.model("user", userSchema);

module.exports = user;
