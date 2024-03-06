const sql = require("./db.js");

const sql_table_name = 'article'

// constructor
const SQLModel = function (sql_model) {
    this.title = sql_model.title;
    this.description = sql_model.description;
    this.author = sql_model.author;
    this.source_url = sql_model.source_url;
    this.image_url = sql_model.image_url;
    this.show_flag = sql_model.show_flag;
};

SQLModel.updateById = (id, object, result) => {
    sql.query(
        `UPDATE ${sql_table_name} SET title = ?, description = ?,author = ?,source_url = ?,source_url = ?, show_flag = ? WHERE id = ?`,
        [ object.title, object.description, object.author, object.source_url, object.image_url, object.show_flag, id],
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
    let query = `SELECT * FROM ${sql_table_name}`;

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

SQLModel.getShowArticle = ( result) => {
    let query = `SELECT * FROM ${sql_table_name}`;
    query += ` WHERE show_flag = '1'`;

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
