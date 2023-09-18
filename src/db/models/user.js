/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			validate(value) {
				if (value.includes("password")) {
					throw new Error('Password cannot contain "password"');
				}
			},
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		is_admin: {
			type: Boolean,
			required: true,
			default: false,
		},
		role: {
			type: String,
			required: true,
			default: "user",
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

userSchema.virtual("categories", {
	ref: "Category",
	localField: "_id",
	foreignField: "creator",
});

userSchema.methods.getPublicProfile = function () {
	const user = this;
	const userObject = user.toObject();
	delete userObject.password;
	delete userObject.tokens;
	return userObject;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
	user.tokens = user.tokens.concat({ token: token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email: email });
	if (!user) {
		throw new Error("Invalid credentials!");
	}
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Invalid credentials!");
	}
	return user;
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
