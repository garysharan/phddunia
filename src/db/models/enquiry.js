/** @format */

const mongoose = require("mongoose");

const enquirySchema = mongoose.Schema(
	{
		fullname: {
            type: String,
            unique:false,
			required: true,
			trim: true,
		},
		email: {
            type: String,
            required: true,
            unique:true,
			trim: true,
		},
		mobile: {
			type: String,
            required: true,
            unique:true,
			trim: true,
		},
		
		address: {
			type: String,
			required: true,
			trim: true,
		},
        course: {
            type: String,
			required: true,
			trim: true,
        },
		active: {
			type: Boolean,
			default: true,
		},
		open: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;
