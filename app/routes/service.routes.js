module.exports = app => {
    const objectController = require("../controllers/service.controller");

    const added_url = 'service'

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", objectController.create);

    // Retrieve all Tutorials
    router.get("/", objectController.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", objectController.findOne);

    // Update a Tutorial with id
    router.put("/:id", objectController.update);

    // Delete a Tutorial with id
    router.delete("/:id", objectController.delete);

    // Delete all Tutorials
    router.delete("/", objectController.deleteAll);

    app.use('/api/' + added_url, router);
};
