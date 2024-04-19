const Account = require("../models/account");
// Récupération de tous les accounts
exports.readAllAccounts = (req, res) => {
	try{
		const accounts = Account.find({userId: req.auth.userId});
		res.status(200).json(accounts);
	}
	catch(error){
		res.status(500).json({
			message: error.message || "Erreur lors de la récupération des comptes.",
		});
	}
}
// Récupération d'un account
exports.readAccount = async (req, res) => {
	console.log(req.params.id);
	try{
		const account = await Account.findOne({ _id: req.params.id, userId: req.auth.userId });
		if (!account) {
			return res.status(404).json({
				status: "fail",
				message: "Pas de compte trouvé avec cet ID",
			});
		}
		res.status(200).json(account);
	}
	catch(error){
		res.status(500).json({
			message: error.message || "Erreur lors de la récupération du compte.",
		});
	}
}
// Création d'un account
exports.createAccount = async (req, res) => {
	try {
		const { bankName, customName } = req.body;
		const account = new Account({
			bankName: bankName,
			customName: customName,
			userId: req.auth.userId,
		});
		await account.save();
		res.status(201).json(account);
	} catch (error) {
		res.status(500).json({
			message: error.message || " Erreur lors de la création du compte.",
		});
	}
}
// Mettre à jour un account
exports.updateAccount = async (req, res) => {
	try {
		const { bankName, customName } = req.body;
		const account = await Account.findByIdAndUpdate(
			{ _id: req.params.id, userId: req.auth.userId },
			{ bankName, customName },
			{ new: true, runValidators: true }
		);

		if (!account) {
			return res.status(404).json({
				status: "fail",
				message: "Pas de compte trouvé avec cet ID",
			});
		}

		res.status(200).json(account);
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: error,
		});
	}
};

// Supprimer un account
exports.deleteAccount = async (req, res) => {
	try {
		const account = await Account.findOneAndDelete({ _id: req.params.id, userId: req.auth.userId });
		if (!account) {
			return res.status(404).json({
				status: "fail",
				message: "Pas de compte trouvé avec cet ID",
			});
		}
		res.status(200).json({message: "Compte supprimé avec succès"});
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: error,
		});
	}
};