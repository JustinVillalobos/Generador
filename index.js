const electron = require("electron");
const { app, BrowserWindow, ipcMain, screen } = electron;
const remote = require("electron").remote;

const Validations = require("./Electron/Validations");
const validations = new Validations();
let appWin;

const Medidas = require("./Electron/MedidasController");
const medidasClass = new Medidas();

const Producto = require("./Electron/ProductoController");
const productosClass = new Producto();

const Embarcador = require("./Electron/EmbarcadorController");
const embarcadorClass = new Embarcador();

const Consignatario = require("./Electron/ConsignatarioController");
const consignatarioClass = new Consignatario();

const Reportes = require("./Electron/ReporteController");
const reportesClass = new Reportes();

createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  appWin = new BrowserWindow({
    width: width,
    height: height,
    title: "Generador",
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  appWin.maximize();
  appWin.loadURL(`file://${__dirname}/dist/index.html`);

  appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
  });
};
console.log("Index");
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/*EVENTOS Medidas*/
ipcMain.on("allMedidas", (event) => {
  let res = medidasClass.allMedidas();
  res
    .then((_data) => {
      const convertedResponse = JSON.parse(JSON.stringify(_data));
      event.reply("allMedidas", { res: true, medidas: convertedResponse });
    })
    .catch(() => {
      event.reply("allMedidas", { res: false });
    });
});
ipcMain.on("medidaById", (event,data) => {
  let res = medidasClass.medidaById(data);
  res
    .then((_data) => {
      const convertedResponse = JSON.parse(JSON.stringify(_data[0]));
      event.reply("medidaById", {
        res: true,
        medida: convertedResponse,
      });
    })
    .catch(() => {
      event.reply("medidaById", { res: false });
    });
});

ipcMain.on("addMedida", (event, data) => {
  const validateName = validations.FormatoAlfaNumerico(data.descripcion, 55);
  if (validateName) {
    let res = medidasClass.addMedida(data);
    res
      .then((_data) => {
        event.reply("addMedida", { res: true });
      })
      .catch(() => {
        event.reply("addMedida", { res: false });
      });
  } else {
    event.reply("addMedida", { res: false });
  }
});
ipcMain.on("editMedida", (event, data) => {
  const validateName =validations.FormatoAlfaNumerico(data.descripcion, 55);
  const validateId = validations.FormatoNumerico(data.idMedida);
  console.log("Ingreso",data,data.descripcion);
  if (validateName && validateId) {
    let res = medidasClass.updateMedida(data);
    res
      .then((_data) => {
        event.reply("editMedida", { res: true });
      })
      .catch((err) => {
        console.log(err);
        event.reply("editMedida", { res: false });
      });
  } else {
    event.reply("editMedida", { res: false });
  }
});
ipcMain.on("deleteMedida", (event,data) => {
  let res = medidasClass.deleteMedida(data);
  res
    .then((_data) => {
      event.reply("deleteMedida", {
        res: true
      });
    })
    .catch(() => {
      event.reply("deleteMedida", { res: false });
    });
});

/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/

/*EVENTOS Productos*/
ipcMain.on("allProductos", (event) => {
  let res = productosClass.allProductos();
  res
    .then((_data) => {
      const convertedResponse = JSON.parse(JSON.stringify(_data));
      event.reply("allProductos", { res: true, productos: convertedResponse });
    })
    .catch(() => {
      event.reply("allProductos", { res: false });
    });
});
ipcMain.on("productoById", (event,data) => {
  let res = productosClass.productById(data);
  res
    .then((_data) => {
      const convertedResponse = JSON.parse(JSON.stringify(_data[0]));
      event.reply("productoById", {
        res: true,
        producto: convertedResponse,
      });
    })
    .catch(() => {
      event.reply("productoById", { res: false });
    });
});

ipcMain.on("addProducto", (event, data) => {
  const validateName =validations.FormatoAlfaNumerico(data.descripcion, 125);
  const validatePesoNeto =data.peso_neto.length!=0;
  const validatePesoBruto =data.peso_bruto.length!=0;
  if (validateName && validatePesoNeto && validatePesoBruto) {
    let res = productosClass.addProducto(data);
    res
      .then((_data) => {
        event.reply("addProducto", { res: true });
      })
      .catch(() => {
        event.reply("addProducto", { res: false });
      });
  } else {
    event.reply("addProducto", { res: false });
  }
});
ipcMain.on("updateProducto", (event, data) => {
  const validateName =validations.FormatoAlfaNumerico(data.descripcion, 125);
  const validateId = validations.FormatoNumerico(data.medida.idMedida);
  if (validateName && validateId) {
    let res = productosClass.updateProducto(data);
    res
      .then((_data) => {
        event.reply("updateProducto", { res: true });
      })
      .catch((err) => {
        console.log(err);
        event.reply("updateProducto", { res: false });
      });
  } else {
    event.reply("updateProducto", { res: false });
  }
});

/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/

/*EVENTOS Embarcador*/
ipcMain.on("allEmbarcadores", (event) => {
  let res = embarcadorClass.allProductos();
  res
    .then((_data) => {
      const convertedResponse = JSON.parse(JSON.stringify(_data));
      event.reply("allEmbarcadores", { res: true, embarcadores: convertedResponse });
    })
    .catch(() => {
      event.reply("allEmbarcadores", { res: false });
    });
});

ipcMain.on("updateEmbarcador", (event, data) => {
  
  const validateName =validations.FormatoAlfaNumerico(data.nombreEmpresa, 150);
  const validateCorreo =validations.FormatoAlfaNumerico(data.correo, 75);
  const validateDireccion =validations.FormatoAlfaNumerico(data.direccion, 200);
  const validatePBX =validations.FormatoAlfaNumerico(data.pbx, 25);
  const validateId = validations.FormatoNumerico(data.idEmbarcador);
  if (validateName && validateId && validateCorreo && validateDireccion && validatePBX) {
    let res = embarcadorClass.updateEmbarcador(data);
    res
      .then((_data) => {
        event.reply("updateEmbarcador", { res: true });
      })
      .catch((err) => {
        console.log(err);
        event.reply("updateEmbarcador", { res: false });
      });
  } else {
    event.reply("updateEmbarcador", { res: false });
  }
});

/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/*EVENTOS Clientes*/
ipcMain.on("Clientes", (event) => {
  let res = consignatarioClass.allConsignatarios();
  res
    .then((_data) => {
      const convertedResponse = JSON.parse(JSON.stringify(_data));
      event.reply("Clientes", { res: true, clientes: convertedResponse });
    })
    .catch(() => {
      event.reply("Clientes", { res: false });
    });
});


ipcMain.on("addCliente", (event,data) => {
  let response = consignatarioClass.saveConsignatario(data);
  response
    .then((_data) => {
      event.reply("addCliente", { res: true });
    })
    .catch(() => {
      event.reply("addCliente", { res: false });
    });
});
ipcMain.on("editCliente", (event,data) => {
  let response = consignatarioClass.update(data);
  response
    .then((_data) => {
      event.reply("editCliente", { res: true });
    })
    .catch((err) => {
      console.log(err);
      event.reply("editCliente", { res: false });
    });
});

/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/****************************************************************************************************/
/*EVENTOS Reportes*/
ipcMain.on("allReportes", (event) => {
  let res = reportesClass.allReportes();
  res
    .then((_data) => {
      const convertedResponse = JSON.parse(JSON.stringify(_data));
      event.reply("allReportes", { res: true, reportes: convertedResponse });
    })
    .catch(() => {
      event.reply("allReportes", { res: false });
    });
});
ipcMain.on("reporteById", (event,data) => {
  let res = reportesClass.reportetById(data);
  res
    .then((_data) => {
      const cr = JSON.parse(JSON.stringify(_data));
      res = embarcadorClass.allProductos();
      res
        .then((_data) => {
          const convertedResponse = JSON.parse(JSON.stringify(_data[0]));
          cr[0].empresa = convertedResponse;
         
          let js = JSON.parse(JSON.stringify(cr[0]));
          console.log(js);
          res = consignatarioClass.consignatariotById(js.idConsignatario);
          res
            .then((_data) => {
              const cl = JSON.parse(JSON.stringify(_data[0]));
              cr[0].consignatario = cl;
              event.reply("reporteById", { res: true, reportes: cr });
            })
            .catch((err) => {
              console.log(err);
              event.reply("reporteById", { res: false });
            });
        })
        .catch((err) => {
          console.log(err);
          event.reply("reporteById", { res: false });
        });
     
     
    })
    .catch((err) => {
      console.log(err);
      event.reply("reporteById", { res: false });
    });
});

ipcMain.on("saveReporte", (event,data) => {
      let dataConsignatario = {
        "correo":data.consignatario.correo,
        "name":data.consignatario.nombre
      }
      
        let convertedResponse = "";
        console.log(data);
        console.log(data);
        data.fechaCreacion = new Date();
        response = reportesClass.saveReporte(data);
        response
        .then((_data) => {
          response = reportesClass.reportByNombreEmbarcadorAndFechaAndidConsignatario(data);
          response
          .then((_dataReporte) => {
            let count = 0;
            console.log(_dataReporte);
            convertedResponse = JSON.parse(JSON.stringify(_dataReporte[0]));
            console.log("*********************************************************");
            console.log(convertedResponse);
            for(let i=0;i<data.productos.length;i++){
              data.productos[i].idReporte = convertedResponse.idReporte;
              console.log(data);
              response = reportesClass.savePackingList(data.productos[i]);
              response
              .then((_data) => {
                count++;
                console.log(count,data.productos.length-1);
                if(count >=data.productos.length-1){
                  event.reply("saveReporte", { res: true });
                }
                
              })
              .catch((err) => {
                console.log(err);
                event.reply("saveReporte", { res: false });
              });
            }
           
          })
          .catch((err) => {
            console.log(err);
            event.reply("saveReporte", { res: false });
          });
        })
        .catch((err) => {
          console.log(err);
          event.reply("saveReporte", { res: false });
        });

});