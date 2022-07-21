let mssql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "db_generador",
};
module.exports = class Sql {
  constructor() {}

  connect() {
    var connection = mssql.createConnection(config);
    return connection;
  }

  close(connection) {
    return connection.end();
  }
};
