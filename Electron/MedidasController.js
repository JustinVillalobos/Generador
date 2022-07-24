const sqlConnection = require("./Config");
const sql = new sqlConnection();
module.exports = class Medidas {
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
  async allMedidas() {
    let res = await this.promiseMethod("SELECT * FROM medidas", "");
    return res;
  }
  async medidaById(data) {
    let parameter = [data];
    let res = await this.promiseMethod("SELECT * FROM medidas where idMedida=?", parameter);
    return res;
  }
  async deleteMedida(data) {
    let parameter = [data];
    let res = await this.promiseMethod("DELETE FROM medidas where idMedida=?", parameter);
    return res;
  }
  async addMedida(data) {
    let parameters = [
      data.descripcion,
    ];
    let res = await this.promiseMethod(
      "INSERT INTO medidas VALUES(null,?)",
      parameters
    );
    return res;
  }
  async updateMedida(data) {
    let parameters = [
      data.descripcion,
      data.idMedida
    ];
    let res = await this.promiseMethod(
      "UPDATE medidas set descripcion=? WHERE idMedida=?",
      parameters
    );
    return res;
  }
}