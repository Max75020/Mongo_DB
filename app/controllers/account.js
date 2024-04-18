// Récupération de tous les accounts
exports.readAllAccounts = (req, res) => {
	res.send("Read All Accounts");
}
// Récupération d'un account
exports.readAccount = (req, res) => {
	res.send("Read Account");
}
// création d'un account
exports.createAccount = (req, res) => {
	res.send("Create Account");
}
// Mettre à jour un account
exports.updateAccount = (req, res) => {	
	res.send("Update Account");
}
// Supprimer un account
exports.deleteAccount = (req, res) => {
	res.send("Delete Account");
}