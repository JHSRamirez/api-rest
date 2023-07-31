const { Pool } = require("pg");

const pool = new Pool({
  host: "pruebatecnica2023.postgres.database.azure.com",
  user: "Johan@pruebatecnica2023",
  password: "Postgresql123!",
  database: "flujo_fondos_limpio",
  port: "5432",
});

const getUserByID = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(
    "select * from flujo_fondos_cl where documento = $1",
    [id]
  );
  res.status(200).json(response.rows);
};

const getUserByIDPerTotCat = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(
    "SELECT documento,categoria,SUM(mnt_trx_mm) AS total_monto,SUM(num_trx) AS total_cantidad,SUM(pct_mnt_tot) AS total_porcentaje_monto,SUM(pct_num_trx_tot) AS total_porcentaje_cantidad from flujo_fondos_cl where documento = $1 group by 1,2 ",
    [id]
  );
  res.status(200).json(response.rows);
};

const getUserByIDPerTot = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(
    "SELECT documento,SUM(mnt_trx_mm) AS total_monto,SUM(num_trx) AS total_cantidad,SUM(pct_mnt_tot) AS total_porcentaje_monto,SUM(pct_num_trx_tot) AS total_porcentaje_cantidad from flujo_fondos_cl where documento = $1 group by 1",
    [id]
  );
  res.status(200).json(response.rows);
};

module.exports = {
  getUserByID,
  getUserByIDPerTotCat,
  getUserByIDPerTot,
};
