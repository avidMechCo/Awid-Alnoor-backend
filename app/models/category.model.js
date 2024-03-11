const async = require("async");

const sql = require("./db.js");
const ProModel = require("./product.model");
// import map from 'async/map';
const sql_table_name = 'category'

// constructor
const SQLModel = function (sql_model) {
    this.service_id = sql_model.service_id;
    this.title = sql_model.title;
    this.description = sql_model.description;
    this.image_url = sql_model.image_url;
};

SQLModel.updateById = (id, object, result) => {
    sql.query(
        `UPDATE ${sql_table_name} SET service_id = ?,title = ?, description = ?, image_url = ? WHERE id = ?`,
        [object.service_id, object.title, object.description, object.image_url, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log(`updated ${sql_table_name}: `, {id: id, ...object});
            result(null, {id: id, ...object});
        }
    );
};

SQLModel.create = (newObject, result) => {
    sql.query(`INSERT INTO ${sql_table_name} SET ?`, newObject, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`created ${sql_table_name}: `, {id: res.insertId, ...newObject});
        result(null, {id: res.insertId, ...newObject});
    });
};

SQLModel.findById = (id, result) => {
    sql.query(`SELECT * FROM ${sql_table_name} WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found ${sql_table_name}: `, res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({kind: "not_found"}, null);
    });
};

SQLModel.findByServiceId = (service_id, result) => {
    sql.query(`SELECT obj.*,ser.service_title as service_title FROM ${sql_table_name} obj JOIN (
            SELECT s.id,s.title as service_title FROM service as s) ser ON obj.service_id=ser.id WHERE service_id = ${service_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({kind: "not_found"}, null);
    });
};

SQLModel.findCatProByService = (service_id, result) => {
    sql.query(`SELECT obj.*,ser.service_title as service_title FROM ${sql_table_name} obj JOIN (
            SELECT s.id,s.title as service_title FROM service as s) ser ON obj.service_id=ser.id WHERE service_id = ${service_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            let res_ids = []
            for (let i = 0; i < res.length; i++) res_ids[i] = res[i].id

            async.map(res_ids, ProModel.findByCategoryId, function (err, results) {
                let final_result = {}
                for (let i = 0; i < results.length; i++) {
                    final_result[res[i].title] = results[i]
                }

                result(null, final_result);
            });
            return;
        }

        // not found Tutorial with the id
        result({kind: "not_found"}, null);
    });
};

SQLModel.getAll = (title, result) => {
    let query = `SELECT *,ser.service_title as service_title FROM ${sql_table_name} obj JOIN (
            SELECT s.id,s.title as service_title FROM service as s) ser ON obj.service_id=ser.id`;

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`${sql_table_name}: `, res);
        result(null, res);
    });
};

SQLModel.remove = (id, result) => {
    sql.query(`DELETE FROM ${sql_table_name} WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`deleted ${sql_table_name} with id: `, id);
        result(null, res);
    });
};

SQLModel.removeAll = result => {
    sql.query(`DELETE FROM ${sql_table_name}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} ${sql_table_name}`);
        result(null, res);
    });
};

module.exports = SQLModel;
