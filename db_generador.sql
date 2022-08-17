-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-08-2022 a las 15:46:41
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9
DROP database db_generador;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_generador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consignatario`
--
create database db_generador;
use db_generador;
CREATE TABLE `consignatario` (
  `idConsignatario` int(11) NOT NULL,
  `nombreEmpresa` varchar(150) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(75) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `consignatario`
--

INSERT INTO `consignatario` (`idConsignatario`, `nombreEmpresa`, `direccion`, `telefono`, `nombre`, `correo`) VALUES
(1, 'Empresa S.A', 'Plaza Central', '55555555', 'Empresa', 'Empresas@empresa.net');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `embarcador`
--

CREATE TABLE `embarcador` (
  `idEmbarcador` int(11) NOT NULL,
  `nombreEmpresa` varchar(150) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `pbx` varchar(25) NOT NULL,
  `correo` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `embarcador`
--

INSERT INTO `embarcador` (`idEmbarcador`, `nombreEmpresa`, `direccion`, `pbx`, `correo`) VALUES
(1, 'Industrias Novafilm, S.A.', 'Km. 32,5 Carr. Al Pacífico, Bodega M Interior Parque 2, Flor de Campo  Amatitlán, Guatemala', '66322849', 'logistica@novafilm.com.gt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medidas`
--

CREATE TABLE `medidas` (
  `idMedida` int(11) NOT NULL,
  `descripcion` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `medidas`
--

INSERT INTO `medidas` (`idMedida`, `descripcion`) VALUES
(1, 'piezas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `packing_list`
--

CREATE TABLE `packing_list` (
  `idReporte` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `totalPeso` float NOT NULL,
  `bultos` int(11) NOT NULL,
  `totalNeto` float DEFAULT NULL,
  `flete` float DEFAULT NULL,
  `seguro` float DEFAULT NULL,
  `fob` float DEFAULT NULL,
  `otros` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `packing_list`
--



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `descripcion` varchar(125) NOT NULL,
  `peso_neto` float NOT NULL,
  `peso_bruto` float NOT NULL,
  `idMedida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `descripcion`, `peso_neto`, `peso_bruto`, `idMedida`) VALUES
(1, 'PELICULA ESTIRABLE (STRECH FILM)  Codigo: PRBE-1300 UEC', 1.195, 1.62, 1),
(2, 'PELICULA ESTIRABLE (STRECH FILM)  Codigo: HRP-048-17.5-1220 UEC', 1.848, 2.27, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `idReporte` int(11) NOT NULL,
  `idFactura` varchar(25) NOT NULL,
  `idConsignatario` int(11) NOT NULL,
  `idEmbarcador` int(11) NOT NULL,
  `nombreEmbarcador` varchar(75) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `totalNeto` float NOT NULL,
  `totalBruto` float NOT NULL,
  `totalFactura` float DEFAULT NULL,
  `Seguro` float NOT NULL,
  `flete` float NOT NULL,
  `fob` float NOT NULL,
  `otros` float NOT NULL,
  `tasa` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reporte`
--


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consignatario`
--
ALTER TABLE `consignatario`
  ADD PRIMARY KEY (`idConsignatario`);

--
-- Indices de la tabla `embarcador`
--
ALTER TABLE `embarcador`
  ADD PRIMARY KEY (`idEmbarcador`);

--
-- Indices de la tabla `medidas`
--
ALTER TABLE `medidas`
  ADD PRIMARY KEY (`idMedida`);

--
-- Indices de la tabla `packing_list`
--
ALTER TABLE `packing_list`
  ADD PRIMARY KEY (`idReporte`,`idProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `producto_medida` (`idMedida`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idReporte`),
  ADD UNIQUE KEY `idFactura` (`idFactura`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consignatario`
--
ALTER TABLE `consignatario`
  MODIFY `idConsignatario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `embarcador`
--
ALTER TABLE `embarcador`
  MODIFY `idEmbarcador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `medidas`
--
ALTER TABLE `medidas`
  MODIFY `idMedida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_medida` FOREIGN KEY (`idMedida`) REFERENCES `medidas` (`idMedida`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
