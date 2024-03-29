module.exports = app => {
    const objectController = require("../controllers/category.controller");

    const added_url = 'category'

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", objectController.create);

    // Retrieve all Tutorials
    router.get("/", objectController.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", objectController.findOne);

    // Retrieve a all Category with service_id
    router.get("/service_id/:service_id", objectController.findByService);

    // Retrieve a all category and product with service_id
    router.get("/service_id/with_pro/:service_id", objectController.findCatProByService);

    // Update a Tutorial with id
    router.put("/:id", objectController.update);

    // Delete a Tutorial with id
    router.delete("/:id", objectController.delete);

    // Delete all Tutorials
    router.delete("/", objectController.deleteAll);

    app.use('/api/' + added_url, router);
};
