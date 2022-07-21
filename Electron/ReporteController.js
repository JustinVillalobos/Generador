const sqlConnection = require("./Config");
const sql = new sqlConnection();
module.exports = class Reportes {
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
  async allReportes() {
    let res = await this.promiseMethod("SELECT * FROM reporte", "");
    return res;
  }
  async reportetById(data) {
    let parameter = [data];
    let res = await this.promiseMethod("SELECT r.*,pl.*,p.*, m.descripcion as medida FROM reporte r INNER JOIN packing_list pl ON r.idReporte=pl.idReporte INNER JOIN producto p ON p.idProducto=pl.idProducto INNER JOIN medidas m ON m.idMedida=p.idMedida  WHERE idReporte=?", parameter);
    return res;
  }
  async reportByNombreEmbarcadorAndFechaAndidConsignatario() {
    let parameters = [
      data.reporte.idConsignatario,
      data.reporte.fechaCreacion,
      data.reporte.nombreEmbarcador
    ];
    let res = await this.promiseMethod("SELECT * FROM reporte where idConsignatario=? and fechaCreacion=? and nombreEmbarcador=?",parameters);
    return res;
  }

  async saveReporte(data) {
    let parameters = [
      data.reporte.idConsignatario,
      data.reporte.idEmbarcador,
      data.reporte.nombreEmbarcador,
      data.reporte.fechaCreacion,
      data.reporte.totalNeto,
      data.reporte.totalBruto
    ];
    let res = await this.promiseMethod(
      "INSERT INTO reporte VALUES(null,?,?,?,?,?,?)",
      parameters
    );
    return res;
  }
  async savePackingList(reporte) {
    let parameters = [
      reporte.idReporte,
      reporte.idProducto,
      reporte.cantidad,
      reporte.totalPeso,
      reporte.bulto
    ];
    let res = await this.promiseMethod(
      "INSERT INTO packing_list VALUES(?,?,?,?,?)",
      parameters
    );
    return res;
  }
}