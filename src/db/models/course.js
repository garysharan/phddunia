/** @format */

const mongoose = require("mongoose");

const Course = mongoose.model("Course", {
	shortname: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	desc: {
		type: String,
		required: true,
		trim: true,
	},
	streamID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Stream",
	},
	eligibility: {
		type: String,
		required: true,
		trim: true,
	},
	courseDurationID: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "CourseDuration",
	},
	active: {
		type: Boolean,
		required: true,
		default: true,
	},
	approved: {
		type: Boolean,
		required: true,
		default: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
});

module.exports = Course;
