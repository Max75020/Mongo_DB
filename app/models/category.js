const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new mongoose.Schema({
	name: {
		type: string,
		unique: true,
		required: [true, "Le nom de la catégorie est obligatoire"],
	},
});
categorySchema.plugin(uniqueValidator);
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;