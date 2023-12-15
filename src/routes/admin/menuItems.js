const router = require('express').Router();
var menuController = require('../../controllers/admin/menuItems');

router.route('/users')
    .post(menuController.createMenuItemController);

router.route('/users')
    .put(menuController.updateMenuItemsByTypeController);

router.route('/users/:type')
    .get(menuController.getMenuItemsByTypeController);

router.route('/users')
    .get(menuController.getAllMenuItemsController);

module.exports = router;