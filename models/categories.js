const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 100
    },
    description: {
        type: String,
        required: true,
        max: 1000
    },
});

CategorySchema.virtual('url').get(function () { return '/categories/' + this._id; });
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;