const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
dotenv.config({ path: ".././src/config/config.env" });

const accomodationSchema = new Schema({

  // review: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Review'
  // },
  
  reviewsId: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Array of review references
  
  rent: { type: Number, required: true },

  title: { type: String, required: true },
  desc: { type: String, required: true },
  capacity: { type: Number, required: true },

  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  
  createdBy: { type: String },
  services: {type: [String]},
  backgoundImages: {type: [String]},
  // backgoundImages: [{type: String}],
  isActive: { type: Boolean, default: true },






}, {timestamps: true});

accomodationSchema.index({ location: '2dsphere' });

const Accomodation = mongoose.model("Accomodation", accomodationSchema);

module.exports = Accomodation;
