
module.exports = function(pool) {
  const express = require("express");
  const router = express.Router();

  // Signup route
  router.post("/signup", async (req, res) => {
    try {
      console.log(req.body || "no body content found");
      const client = await pool.connect();
      const { firstName, lastName, email, password } = req.body;
      const result = await client.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstName, lastName, email, password]
      );

      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  });

  return router;
}