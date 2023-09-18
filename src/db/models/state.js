const mongoose = require("mongoose");


const State = mongoose.model("State", {
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
   countryID: {
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'Country',
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


module.exports = State;
