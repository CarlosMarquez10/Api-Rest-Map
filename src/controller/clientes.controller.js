import { pool } from "../db.js";

export const getclientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cliente");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getusuario = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cliente WHERE Cliente = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "No se encontraron datos",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getmedidor = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM cliente WHERE Medidor = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "No se encontraron datos",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getBuscar = async (req, res) => {
  try {
    const usuarios = req.body.usuarios;

    // Crea un array de promesas para las consultas a la base de datos
    let promesas = usuarios.map((usuario) => {
      // Devuelve una nueva promesa para cada usuario
      return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM cliente WHERE Cliente = ?`;
        pool
          .query(sql, [usuario])
          .then(([rows, fields]) => {
            resolve(rows[0]); // Resuelve la promesa con el primer objeto de 'rows'
          })
          .catch((err) => {
            reject(err); // Rechaza la promesa si hay un error
          });
      });
    });

    // Espera a que todas las promesas se resuelvan
    Promise.all(promesas)
      .then((resultados) => {
        // Envía los resultados de vuelta al frontend
        console.log(resultados.length);
        res.json(resultados);
      })
      .catch((err) => {
        // Maneja cualquier error que pueda ocurrir
        console.error(err.message);
      });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const postclientes = async (req, res) => {
  try {
    const {
      Cliente,
      Nombre,
      EstadoCliente,
      Direccion,
      RutaLectura,
      Regional,
      Ciclo,
      Ddata,
      Tranformador,
      Municipio,
      Barrio,
      Area,
      Telefono,
      TelefonoCelular,
      TelefonoContacto,
      DMedidor,
      Medidor,
      Facturacion,
      Latitud,
      Longitud,
      Posterior,
      Anterior,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO cliente(Cliente, Nombre, EstadoCliente, Direccion,RutaLectura, Regional,Ciclo,Ddata,Tranformador,Municipio,Barrio,Area,Telefono,TelefonoCelular, TelefonoContacto,DMedidor,Medidor, Facturacion, Latitud,Longitud,Posterior, Anterior) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        Cliente,
        Nombre,
        EstadoCliente,
        Direccion,
        RutaLectura,
        Regional,
        Ciclo,
        Ddata,
        Tranformador,
        Municipio,
        Barrio,
        Area,
        Telefono,
        TelefonoCelular,
        TelefonoContacto,
        DMedidor,
        Medidor,
        Facturacion,
        Latitud,
        Longitud,
        Posterior,
        Anterior,
      ]
    );
    res.send({ rows });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteclientes = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM cliente WHERE Cliente = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      res.status(404).json({
        message: "No se encontro el cliente",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const putclientes = async (req, res) => {
  const { id } = req.params;
  const {
    Cliente,
    Nombre,
    EstadoCliente,
    Direccion,
    RutaLectura,
    Regional,
    Ciclo,
    Ddata,
    Tranformador,
    Municipio,
    Barrio,
    Area,
    Telefono,
    TelefonoCelular,
    TelefonoContacto,
    DMedidor,
    Medidor,
    Facturacion,
    Latitud,
    Longitud,
    Posterior,
    Anterior,
  } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE cliente SET Cliente = ?, Nombre = ?,EstadoCliente = ?,Direccion = ?,RutaLectura = ?, Regional = ?,Ciclo = ?, Ddata = ?,Tranformador = ?, Municipio = ?,Barrio = ?,Area = ?,Telefono = ?,TelefonoCelular = ?,TelefonoContacto = ?,DMedidor = ?,Medidor = ?,Facturacion = ?,Latitud = ?,Longitud = ?,Posterior = ?,Anterior = ? WHERE Cliente = ?",
      [
        Cliente,
        Nombre,
        EstadoCliente,
        Direccion,
        RutaLectura,
        Regional,
        Ciclo,
        Ddata,
        Tranformador,
        Municipio,
        Barrio,
        Area,
        Telefono,
        TelefonoCelular,
        TelefonoContacto,
        DMedidor,
        Medidor,
        Facturacion,
        Latitud,
        Longitud,
        Posterior,
        Anterior,
        Cliente,
      ]
    );

    console.log(result);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Cliente no se encontro",
      });

    const [rows] = await pool.query("SELECT * FROM cliente WHERE Cliente = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
