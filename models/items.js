const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, max: 1000},
    price: {type: Number, required: true},
    number_in_stock: Number,
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
  }
);

ItemSchema.virtual('url').get(function()
	{
		return '/items/' + this._id;
	});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;