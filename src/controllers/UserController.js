const pool = require("../helper/database").pool;

exports.GetUsers = async (req, res) => {
  const { x, y } = req.body;
  const sqlQuery = "";
  const data = [];

  await pool.query(sqlQuery, data, (err, results) => {
    if (err) res.status(200).json({ ErrorMessage: "something went wrong " });
    if (results) res.status(200).json({ data: results });
  });
};