const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
	bankName: {
		type: String,
		required: [true, "Le nom de la banque est obligatoire"],
	},
	customName: {
		type: String,
		required: [true, "Le nom du compte est obligatoire"],
		maxlength: [50, "Le nom du compte doit contenir au maximum 50 caractères"],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "L'utilisateur est obligatoire"],
	},
	lastUpdated: {
		type: Date,
		default: Date.now
	}
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;