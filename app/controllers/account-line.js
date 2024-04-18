// Récupérer toutes les lignes d'un account
exports.readAllAccountsLine = (req, res) => {
	res.send("Read All Accounts Line");
}
// Récupérer une ligne d'un account
exports.readAccountLine = (req, res) => {
	res.send("Read Account Line");
}
// Créer une ligne d'un account
exports.createAccountLine = (req, res) => {
	res.send("Create Account Line");
}
// Mettre à jour une ligne d'un account
exports.updateAccountLine = (req, res) => {
	res.send("Update Account Line");
}
// Supprimer une ligne d'un account
exports.deleteAccountLine = (req, res) => {
	res.send("Delete Account Line");
}