const itemModel = require('../models/items.js');
const categoryModel = require('../models/categories.js');

exports.add_item_form = async (req, res, next) => {
    const categories = await categoryModel.find({});

    try {
        res.render('addItem', { categories: categories });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.add_item = async (req, res, next) => {
    const item = new itemModel(req.body);
    try {
        await item.save();
        console.log(item);
        res.redirect('/addItem');
    } catch {
        res.status(500).send(err);
    }
};

exports.list_items = async (req, res, next) => {

    try {
        const items = await itemModel.find({}).populate('category').exec((err, items) => {
            if (err) { return next(err); }
            res.render('items', { items: items });
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.show_item = async (req, res, next) => {
    const item = await itemModel.findById(req.params.id);
    try {
        res.render('showItem', { item: item });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.delete_item = async (req, res, next) => {
    try {
        const item = await itemModel.findByIdAndDelete(req.params.id);
        if (!item) res.status(404).send("No item found");
        res.redirect('/items');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.show_update_item_form = async (req, res, next) => {
    const item = await itemModel.findById(req.params.id).populate('category').exec(async (err, item) => {
        if (err) { return next(err); }
        const categories = await categoryModel.find({ name: { $ne: item.category.name } });
        res.render('updateItem', { item: item, categories: categories });

    });
};

exports.update_item = async (req, res, next) => {
    const item = await itemModel.findByIdAndUpdate(req.params.id, req.body);
    try{
    if (!item) res.status(404).send("No item found");
        res.redirect(`/items/update/${req.params.id}`);
    }
        catch (err) {
        res.status(500).send(err);
    }
};