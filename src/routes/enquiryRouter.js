/** @format */

const express = require("express");
const Enquiry = require("../db/models/enquiry");
const auth = require("../middleware/auth");
const router = new express.Router();



router.post("/enquiries/addEnquiry", async (req, res) => {


	const enquiry = new Enquiry(req.body);
	try {
		const existsByEmail = await Enquiry.exists({email:req.body.email});
		const existsByMobile = await Enquiry.exists({ mobile:req.body.mobile});
		console.log("ExistsByEmail::::::::::",existsByEmail);
		if (!existsByEmail && !existsByMobile) {
			await enquiry.save();
			res.status(200).send(enquiry);
		}
		else
		{
			res.status(409).send({ error: "Email/Phone already exists." });	
		}
	} catch (error) {
		res.status(400).send(error);
		console.log(error);
	}
});

router.get("/enquiries", async (req, res) => {
	try {
		const enquiries = await Enquiry.find({});
		res.status(200).send(enquiries);
	} catch (error) {
		res.status(400).send(e);
	}
});


router.delete("/enquiries/delete", async (req, res) => {
	const enquiry = await Enquiry.findOne({
		_id: req.body.id
	});
	try {
		const enquiries = await Enquiry.deleteOne(enquiry);
		res.status(200).send(enquiries);
	} catch (error) {
		res.status(400).send(e);
	}
});

module.exports = router;