const mongoose = require("mongoose");

const accountLineSchema = new mongoose.Schema({
	label: {
		type: String,
		trim: true,
		required: [true, "Le libellé est obligatoire"],
		minlength: [2, "Le libellé doit contenir au moins 3 caractères"],
		maxlength: [50, "Le libellé doit contenir au maximum 50 caractères"]
	},
	type: {
		type: String,
		enum: {
			values: ["credit", "debit"],
			message: "Le type doit être 'credit' ou 'debit'"
		},
		required: [true, "Le type est obligatoire"]
	},
	amount: {
		type: Number,
		required: [true, "Le montant est obligatoire"]
	},
	date: { type: Date, required: [true, "La date est obligatoire"] },
	method: {
		type: String,
		enum: {
			values: ["cb", "cheque", "virement", "espece"],
			message: "La méthode doit être 'cb', 'cheque', 'virement' ou 'espece'",
		},
		required: [true, "La méthode est obligatoire"]
	},
	isPassed: {
		type: Boolean,
		default: false,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: [true, "La catégorie est obligatoire"]
	},
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account",
		required: [true, "Le compte est obligatoire"]
	},
	lastUpdated: {
		type: Date,
		default: Date.now
	}
});

accountLineSchema.pre("save", function (next) {
	this.lastUpdated = Date.now();
	next();
});

accountLineSchema.pre("findOneAndUpdate", function (next) {
	this.lastUpdated = Date.now();
	next();
});

const AccountLine = mongoose.model("AccountLine", accountLineSchema);

module.exports = AccountLine;