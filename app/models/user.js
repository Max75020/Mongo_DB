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
		require: [true, "Le mot de passe est requis"],
		trim: true,
		validate: {
			validator: function (password) {
				const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
				return passwordRegex.test(password);
			},
			message: "Le mot de passe doit contenir au moins 6 caractères, une lettre majuscule, une lettre minuscule et un chiffre!"
		}
	},

});

userSchema.plugin(uniqueValidator(Schema, { message: "Cet email est déjà utilisé!" }));
const User = mongoose.model("User", userSchema);

module.exports = User;