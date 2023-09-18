/** @format */

const mongoose = require("mongoose");

const instituteSchema = mongoose.Schema(
	{
		shortname: {
			type: String,
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
		email: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		average_rating: {
			type: Number,
			required: true,
			default: 0,
			trim: true,
		},
		established: {
			type: String,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		state: {
			type: String,
			required: true,
			trim: true,
		},
		logo: {
			type: Buffer,
		},
		banner: {
			type: Buffer,
		},
		courses: [
			{
				shortname: {
					type: String,
					trim: true,
				},
				name: {
					type: String,
					trim: true,
				},
				desc: {
					type: String,
					trim: true,
				},
				semester_fee: {
					type: String,
					trim: true,
					required: true,
				},
				exam_fee: {
					type: String,
					trim: true,
					default:"Free"
				},
				registration_fee: {
					type: String,
					trim: true,
					default:"Free"
				},
				total_fee: {
					type: String,
					required: true,
					trim: true,
				},
				eligibility: {
					type: String,
					required: true,
					trim: true,
				},
				stream: {
					type: String,
					required: true,
					trim:true,
				},
				courseDuration: {
					type: String,
					required: true,
					trim:true,
				},
			},
		],
		active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

const Institute = mongoose.model("Institute", instituteSchema);

module.exports = Institute;
