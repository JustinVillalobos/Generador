const sqlConnection = require("./Config");
const sql = new sqlConnection();
module.exports = class Producto {
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
    let res = await this.promiseMethod("SELECT p.*,m.descripcion as nombreMedida FROM producto p INNER JOIN medidas m ON p.idMedida=m.idMedida", "");
    return res;
  }
  async productById(data) {
    let parameter = [data];
    let res = await this.promiseMethod("SELECT p.*,m.descripcion as nombreMedida FROM producto p INNER JOIN medidas m ON p.idMedida=m.idMedida and idProducto=?", parameter);
    return res;
  }
  async addProducto(data) {
    let parameters = [
      data.descripcion,
      data.peso_neto,
      data.peso_bruto,
      data.medida.idMedida
    ];
    let res = await this.promiseMethod(
      "INSERT INTO producto VALUES(null,?,?,?,?)",
      parameters
    );
    return res;
  }
  async updateProducto(data) {
    let parameters = [
      data.descripcion,
      data.peso_neto,
      data.peso_bruto,
      data.medida.idMedida,
      data.idProducto
    ];
    let res = await this.promiseMethod(
      "UPDATE producto set descripcion=?, precio_neto=?,precio_bruto=?,idMedida=? WHERE idProducto=?",
      parameters
    );
    return res;
  }
}