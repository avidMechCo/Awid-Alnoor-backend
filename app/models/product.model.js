const sql = require("./db.js");

const sql_table_name = 'product'

// constructor
const SQLModel = function (sql_model) {
    this.category_id = sql_model.category_id;
    this.title = sql_model.title;
    this.description = sql_model.description;
    this.web_url = sql_model.web_url;
};

SQLModel.updateById = (id, object, result) => {
    sql.query(
        `UPDATE ${sql_table_name} SET category_id = ?,title = ?, description = ?, image_url = ? WHERE id = ?`,
        [object.category_id,object.title, object.description, object.web_url, id],
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

SQLModel.getAll = (title, result) => {
    let query = `SELECT *,cat.category_title as category_title FROM ${sql_table_name} obj JOIN (
            SELECT c.id,c.title as category_title FROM category as c) cat ON obj.category_id=cat.id`;

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }
    console.log(query)
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

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
