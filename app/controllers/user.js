const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
	try {
		const passwordHash = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			email: req.body.email,
			password: passwordHash
		});
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({
			message: error.message || "Some error occurred while creating new user.",
		});
	}
};

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({ message: "No user" })
		}
		const passwordValid = await bcrypt.compare(req.body.password, user.password);
		if (!passwordValid) {
			return res.status(401).json({ message: "Password invalid" })
		}
		const token = jwt.sign({ id: user._id }, process.env.token_secret, { expiresIn: Number(process.env.token_time) })

		return res.status(200).json({ token, user })
	} catch (error) {
		res.status(500).json({ message: "An error has occured during login" })
	}
};

exports.delete = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "No user found" })
		}
		res.status(200).json({ message: "User deleted" })
	}
	catch (error) {
		res.status(500).json({ message: "An error has occured during deletion" })
	}
}

exports.update = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!user) {
			return res.status(404).json({ message: "No user found" })
		}
		res.status(200).json(user)
	}
	catch (error) {
		res.status(500).json({ message: "An error has occured during update" })
	}
}
