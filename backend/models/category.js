const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  image: String
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
