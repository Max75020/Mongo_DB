const AccountLine = require("../models/account-line");
const mongoose = require("mongoose");
// Récupérer toutes les lignes d'un account
exports.getAllAccountsLine = async (req, res) => {
	try {
		const accountLines = await AccountLine.aggregate([
			{
				$match: {
					account: mongoose.Types.ObjectId.createFromHexString(
						req.params.accountId
					),
				},
			},
			{
				$lookup: {
					from: "accounts",
					localField: "account",
					foreignField: "_id",
					as: "accountDetails",
				},
			},
			{
				$unwind: "$accountDetails",
			},
			{
				$match: {
					"accountDetails.userId": mongoose.Types.ObjectId.createFromHexString(
						req.auth.userId
					),
				},
			},
			{
				$project: {
					accountDetails: 0,
				},
			}
		]);

		if (!accountLines || accountLines.length === 0) {
			return res.status(404).json({
				status: "error",
				message: "No account lines found for the current user and account",
			});
		}

		res.status(200).json(accountLines);
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: error,
		});
	}
};
// Récupérer une ligne d'un account
exports.readAccountLine = async (req, res) => {
	try {
		const accountLine = await AccountLine.aggregate([
			{
				$match: {
					_id: mongoose.Types.ObjectId.createFromHexString(req.params.lineId),
				},
			},
			{
				$lookup: {
					from: "accounts",
					localField: "account",
					foreignField: "_id",
					as: "accountDetails",
				},
			},
			{
				$unwind: "$accountDetails",
			},
			{
				$match: {
					"accountDetails.userId": mongoose.Types.ObjectId.createFromHexString(
						req.auth.userId
					),
				},
			},
			{
				$project: {
					accountDetails: 0,
				},
			},
		]);

		if (!accountLine || accountLine.length === 0) {
			return res.status(404).json({
				status: "fail",
				message: "Pas de ligne trouvée avec cet ID",
			});
		}

		res.status(200).json(accountLine[0]);
	}
	catch (error) {
		res.status(500).json({
			message: error.message || "Erreur lors de la récupération de la ligne de compte.",
		});
	}
}
// Créer une ligne d'un account
exports.createAccountLine = async (req, res) => {
	try {
		const accountId = req.params.accountId;
		const { label, type, amount, date, method, category } = req.body;
		const accountLine = new AccountLine({
			label,
			type,
			amount,
			date,
			method,
			category,
			account: accountId,
		});
		await accountLine.save();
		res.status(201).json(accountLine);

	} catch (error) {
		res.status(500).json({
			message: error.message || "Erreur lors de la création de la ligne de compte.",
		});
	}
}
// Mettre à jour une ligne d'un account
exports.updateAccountLine = async (req, res) => {
	try {
		const accountLine = await AccountLine.findOneAndUpdate(
			{ _id: req.params.lineId },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!accountLine) {
			return res.status(404).json({
				status: "fail",
				message: "Pas de ligne trouvée avec cet ID",
			});
		}
		res.status(200).json({
			status: "success",
			data: {
				accountLine,
				message: "Mis à jour réussie",
			},
		});
	}
	catch {
		res.status(400).json({
			status: "error",
			message: error,
		});
	}
}
// Supprimer une ligne d'un account
exports.deleteAccountLine = async (req, res) => {
	try {
		const accountLine = await AccountLine.findOneAndDelete({ _id: req.params.lineId });
		console.log(req.params.lineId);
		if (!accountLine) {
			return res.status(404).json({
				status: "fail",
				message: "Pas de ligne trouvée avec cet ID",
			});
		}
		res.status(200).json({
			status: "success",
			data: {
				message: "Suppression réussie",
			},
		});
	}
	catch (error) {
		res.status(500).json({
			message: error.message || "Erreur lors de la suppression de la ligne de compte.",
		});
	}
}