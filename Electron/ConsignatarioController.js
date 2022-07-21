const sqlConnection = require("./Config");
const sql = new sqlConnection();
module.exports = class Consignatario {
  constructor() {}
  async promiseMethod(consult, data) {
    var conn = sql.connect();
    try {
      conn.connect();
    } catch (err) {
      
    }
    if (data != "") {
      return new Promise((resolve, reject) => {
        conn.query(consult, data, function (error, results, fields) {
          if (error) {
            //return console.error(error.message);
            return reject(error);
          }
          sql.close(conn);
          return resolve(results);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        conn.query(consult, function (error, results, fields) {
          if (error) {
            //return console.error(error.message);
            return reject(error);
          }
          sql.close(conn);
          return resolve(results);
        });
      });
    }
  }
  async allConsignatarios() {
    let res = await this.promiseMethod("SELECT * FROM consignatario", "");
    return res;
  }
  async consignatariotById(data) {
    let parameter = [data];
    let res = await this.promiseMethod("SELECT * FROM consignatario  WHERE idConsignatario=?", parameter);
    return res;
  }
  async consignatarioByEmailAndName(data) {
    let parameter = [data];
    let res = await this.promiseMethod("SELECT * FROM consignatario  WHERE correo=? and nombre=?", parameter);
    return res;
  }

  async saveConsignatario(data) {
    let parameters = [
      data.consignatario.nombreEmpresa,
      data.consignatario.direccion,
      data.consignatario.telefono,
      data.consignatario.nombre,
      data.consignatario.correo
    ];
    let res = await this.promiseMethod(
      "INSERT INTO consignatario VALUES(null,?,?,?,?,?)",
      parameters
    );
    return res;
  }
}