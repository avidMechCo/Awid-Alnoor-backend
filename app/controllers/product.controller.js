const ObjectModel = require("../models/product.model");

const sql_table_name = 'product'

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const objectModel = new ObjectModel({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
    });

    // Save Tutorial in the database
    ObjectModel.create(objectModel, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${sql_table_name}.`
            });
        else res.send(data);
    });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    ObjectModel.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving ${sql_table_name}.`
            });
        else res.send(data);
    });
};

// Find all Category by category_id
exports.findByCategory = (req, res) => {
    ObjectModel.findByCategoryId(req.params.category_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ${sql_table_name} with category_id ${req.params.category_id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${sql_table_name} with category_id ` + req.params.category_id
                });
            }
        } else res.send(data);
    });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
    ObjectModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ${sql_table_name} with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving ${sql_table_name} with id ` + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    ObjectModel.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found ${sql_table_name} with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating ${sql_table_name} with id ` + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    ObjectModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ${sql_table_name} with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Could not delete ${sql_table_name} with id ` + req.params.id
                });
            }
        } else res.send({message: `${sql_table_name} was deleted successfully!`});
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    ObjectModel.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while removing all ${sql_table_name}.`
            });
        else res.send({message: `All ${sql_table_name} were deleted successfully!`});
    });
};
