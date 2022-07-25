const sqlConnection = require("./Config");
const sql = new sqlConnection();
module.exports = class Embarcador {
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
  async allProductos() {
    let res = await this.promiseMethod("SELECT * FROM embarcador", "");
    return res;
  }
  async productById(data) {
    let parameter = [data];
    let res = await this.promiseMethod("SELECT * FROM embarcador  WHERE idProducto=?", parameter);
    return res;
  }

  async updateEmbarcador(data) {
    let parameters = [
      data.nombreEmpresa,
      data.direccion,
      data.pbx,
      data.correo,
      data.idEmbarcador
    ];
    let res = await this.promiseMethod(
      "UPDATE embarcador set nombreEmpresa=?, direccion=?,pbx=?,correo=? WHERE idEmbarcador=?",
      parameters
    );
    return res;
  }
}