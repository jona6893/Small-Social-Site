module.exports = function (pool) {
  const express = require("express");
  const router = express.Router();
  const fs = require("fs")
   const path = require("path");

  router.post("/update-image", async (req, res) => {

    try {
      const client = await pool.connect();
      const { user_id } = req.body;
      const image = req.files?.image_url;
      console.log(user_id)

      const image_name = Date.now() + "_" + image.name;
      // Save the image to a directory on your server
      let image_path = `./file/users/${user_id}/${image_name}`;
      if (!fs.existsSync(`./file/users/${user_id}`)) {
        fs.mkdirSync(`./file/users/${user_id}`);
      }

      function removeAllFilesSync(directory) {
        const files = fs.readdirSync(directory);

        for (const file of files) {
          const filePath = path.join(directory, file);
          fs.unlinkSync(filePath);
        }
      }

      // Call the function
      removeAllFilesSync(`./file/users/${user_id}`);

      image.mv(image_path, async function (err) {
        if (err) {
          client.release();
          return res.status(500).send(err);
        }
        image_path = `/users/${user_id}/${image_name}`;
        const result = await client.query(
          "UPDATE users SET image_url = $1 WHERE user_id = $2 RETURNING *",
          [image_path, user_id]
        );
        req.session.user.image_url = image_path;
        res.json(result.rows);
        client.release();
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  })

router.post("/friend-request", async (req, res) => {
  try {
    const client = await pool.connect();
    const { user_id, friend_id } = req.body;
    const result = await client.query(
      "INSERT INTO friend_requests (user_id, friend_id, status) VALUES ($1, $2, 'pending') RETURNING *",
      [user_id, friend_id]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

router.get("/friend-requests/:userId", async (req, res) => {
    try{
        const client = await pool.connect();
        const { userId } = req.params;
        const result = await client.query(
          `SELECT fr.request_id, u.first_name || ' ' || u.last_name AS sender, uf.first_name AS receiver, fr.status, fr.created_at, fr.updated_at, u.image_url
          FROM friend_requests fr
          JOIN users u ON fr.user_id = u.user_id
          JOIN users uf ON fr.friend_id = uf.user_id
          WHERE fr.user_id = $1 OR fr.friend_id = $1`,
          [userId]
        );
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred");
    }
});


  return router;
};
