/** @format */

const express = require("express");
const User = require("../db/models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/", (req, res) => {
	res.send("Welcome to PHD Dunia");
});

router.post("/users/create", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password,
		);
		const token = await user.generateAuthToken();
		res.status(200).send({ user: user.getPublicProfile(), token });
	} catch (e) {
		res.status(400).send(e);
		console.log("Error:::", e);
	}
});

router.get("/users", auth, async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get("/users/me", auth, async (req, res) => {
	res.status(200).send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.send({ message: "Logged out successfully" });
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/users/logoutAll", auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send({ message: "Logged out of all sessions successfully" });
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/users/send_enquiry", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password,
		);
		res.status(200).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
