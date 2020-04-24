const express = require('express');
const router = express.Router();
const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoriesController');

/* GET home page. */
router.get('/', category_controller.home_page);

// CATEGORY ROUTES

router.get('/addCategory', category_controller.view_add_category_form);

router.post('/addCategory', category_controller.add_category);

router.get('/categories', category_controller.list_categories);

router.get('/categories/:id', category_controller.show_category);

router.get('/categories/delete/:id',category_controller.delete_category);

// ITEM ROUTES

router.get('/addItem',item_controller.add_item_form );

router.post('/addItem', item_controller.add_item);

router.get('/items', item_controller.list_items);

router.get('/items/delete/:id', item_controller.delete_item);

router.get('/items/:id', item_controller.show_item);

router.get('/items/update/:id', item_controller.show_update_item_form);

router.post('/items/update/:id', item_controller.update_item);


module.exports = router;