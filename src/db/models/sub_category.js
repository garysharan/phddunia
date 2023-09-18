const mongoose = require("mongoose");


const SubCategory = mongoose.model("SubCategory", {
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


module.exports = SubCategory;
