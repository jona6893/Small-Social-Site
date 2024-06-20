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




  return router;
};
