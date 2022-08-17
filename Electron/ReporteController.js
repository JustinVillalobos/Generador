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
    let res = await this.promiseMethod("SELECT r.*,pl.cantidad,pl.bultos,pl.totalPeso as bruto,p.*, m.descripcion as medida FROM reporte r INNER JOIN packing_list pl ON r.idReporte=pl.idReporte INNER JOIN producto p ON p.idProducto=pl.idProducto INNER JOIN medidas m ON m.idMedida=p.idMedida  WHERE r.idReporte=?", parameter);
    return res;
  }
  async reportByNombreEmbarcadorAndFechaAndidConsignatario(data) {
    let parameters = [
      data.consignatario.idConsignatario,
      data.idFactura,
      data.nombre
    ];
    console.log(parameters);
    let res = await this.promiseMethod("SELECT * FROM reporte where idConsignatario=? and idFactura=? and nombreEmbarcador=?",parameters);
    return res;
  }

  async saveReporte(data) {
    let parameters = [
      data.idFactura,
      data.consignatario.idConsignatario,
      data.empresa.idEmbarcador,
      data.nombre,
      data.fechaCreacion,
      data.totalNeto,
      data.totalBruto,
      data.totalFactura,
      data.seguro,
      
      data.flete,
      data.fob,
      data.otros,
      data.tasa
    ];
    console.log(parameters);
    let res = await this.promiseMethod(
      "INSERT INTO reporte VALUES(null,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      parameters
    );
    return res;
  }
  async savePackingList(p) {
    let parameters = [
      p.idReporte,
      p.idProducto,
      p.cantidad,
      p.total,
      p.bultos,
      p.totalNeto,
      p.flete,
      p.seguro,
      p.fob,
      p.otros
    ];
    let res = await this.promiseMethod(
      "INSERT INTO packing_list VALUES(?,?,?,?,?,?,?,?,?,?)",
      parameters
    );
    return res;
  }
}