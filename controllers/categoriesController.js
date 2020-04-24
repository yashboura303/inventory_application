const categoryModel = require('../models/categories.js');

const itemModel = require('../models/items.js');


exports.home_page = async (req, res, next) => {
    const categories = await categoryModel.find({});
    try {
        res.render('index');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.view_add_category_form = (req, res, next) => {
    try {
        res.render('addCategory');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.add_category = async (req, res, next) => {
    const category = new categoryModel(req.body);
    try {
        await category.save();
        console.log(category);
        res.redirect('/addCategory');
    } catch {
        res.status(500).send(err);
    }
};

exports.list_categories = async (req, res, next) => {

    const categories = await categoryModel.find({});
    try {
        res.render('category', { categories: categories });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.show_category = async (req, res, next) => {
    const category = await categoryModel.findById(req.params.id);
    const items = await itemModel.find({ category: category.id });
     try {
        res.render('showCategory', { category: category , items:items});
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.delete_category =  async (req, res, next) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if (!category) res.status(404).send("No item found");
        res.redirect('/categories');
    } catch (err) {
        res.status(500).send(err);
    }
};

