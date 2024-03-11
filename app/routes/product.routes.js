const objectController = require("../controllers/category.controller");
module.exports = app => {
    const objectController = require("../controllers/product.controller");

    const added_url = 'product'

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", objectController.create);

    // Retrieve all Tutorials
    router.get("/", objectController.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", objectController.findOne);

    // Retrieve all product with category_id
    router.get("/category_id/:category_id", objectController.findByCategory);

    // Update a Tutorial with id
    router.put("/:id", objectController.update);

    // Delete a Tutorial with id
    router.delete("/:id", objectController.delete);

    // Delete all Tutorials
    router.delete("/", objectController.deleteAll);

    app.use('/api/' + added_url, router);
};
