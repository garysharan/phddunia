const mongoose = require("mongoose");


const City = mongoose.model("City", {
  name: {
      type: String,
      unique:true,
      required: true,
      trim:true,
    },
  desc: {
      type: String,
      required: true,
      trim:true,
    },
  stateID: {
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'State',
    },
  active: {
      type: Boolean,
      required: true,
      default:true,
  },
  approved: {
      type: Boolean,
      required: true,
      default:true,
  },
   creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User',
  }
});


module.exports = City;
