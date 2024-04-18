const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: [true, "L'email est obligatoire"],
		unique: true,
		trim: true,
		validate: {
			validator: function (email) {
				const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(email);
			},
			message: "L'adresse email n'est pas valide!"
		}
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		validate: {
			validator: function (v) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/.test(v);
			},
			message: (props) =>
				`Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character!`,
		},
	},

});
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

module.exports = User;