

module.exports = function(pool) { 
    const express = require("express");
    const router = express.Router();

    // Login route
    router.post("/login", async (req, res) => {
      try {
        const { email, password, remember_me } = req.body;
        console.log(req.body || "no body content found");
        const client = await pool.connect();
        const result = await client.query(
          "SELECT first_name, last_name, email, user_id, image_url FROM users WHERE email = $1 AND password = $2",
          [email, password]
        );
        console.log(result.rows.length);
        if (result.rows.length > 0) {
          if (remember_me) {
            var thirtyDays = 30 * 24 * 60 * 60 * 1000;
            req.session.cookie.expires = new Date(Date.now() + thirtyDays);
            req.session.cookie.maxAge = thirtyDays;
          } else {
            req.session.cookie.expires = false;
            req.session.cookie.maxAge = false; // Expires at end of session
          }
          const user = {
            email: result.rows[0].email,
            firstName: result.rows[0].first_name,
            lastName: result.rows[0].last_name,
            rememberMe: remember_me,
            user_id: result.rows[0].user_id,
            image_url: result.rows[0].image_url,
          };
          req.session.user = user;
          res.send({ message: "Login successful", user: req.session.user });
        } else {
          res.send({ message: "Login failed" });
        }
        client.release();
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      }
    });

    // Get session data
    router.get("/get-session", (req, res) => {
      console.log(req.session.user);
      if (req.session.user) {
        // Access session data
        const user = req.session.user;
        res.json(user);
      } else {
        res.json({ message: "No session found" });
      }
    });



    // Signout route
    router.get("/signout", async (req, res) => {
      try {
        req.session.destroy();
        res.send({ message: "Signout successful" });
      } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
      }
    });


    return router;
}