module.exports = function (pool) {
  const express = require("express");
  const router = express.Router();

  // post to feed route
  router.post("/post-to-feed", async (req, res) => {
    console.log("made it to post to feed");

    try {
      const client = await pool.connect();
      const { user_id, postContent, postTitle } = req.body;
      const image = req.files?.image_url || null;

      // if no image is uploaded
      if (image === null) {
        const result = await client.query(
          "INSERT INTO feed (author_id, post_content, post_title, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
          [user_id, postContent, postTitle, null]
        );
        res.json(result.rows);
        client.release();
        console.log("no image");
        return;
      }
      // if image is uploaded
      console.log(image);
      // Generate a unique name for the image
      const image_name = Date.now() + "_" + image.name;
      // Save the image to a directory on your server
      let image_path = "./file/post_images/" + image_name;
      image.mv(image_path, async function (err) {
        if (err) {
          client.release();
          return res.status(500).send(err);
        }
        image_path = "/post_images/" + image_name;
        const result = await client.query(
          "INSERT INTO feed (author_id, post_content, post_title, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
          [user_id, postContent, postTitle, image_path]
        );
        res.json(result.rows);
        client.release();
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  });

  // get feed route
  router.get("/get-feed/:user_id", async (req, res) => {
    try {
      const currentUserId = req.params.user_id;
      const client = await pool.connect();
      const result = await client.query(
        `
  SELECT feed.*, users.first_name, users.last_name, users.image_url as author_image, 
    CASE WHEN likes.user_id IS NOT NULL THEN TRUE ELSE FALSE END as has_liked
  FROM feed
  INNER JOIN users ON feed.author_id = users.user_id
  LEFT JOIN likes ON feed.post_id = likes.post_id AND likes.user_id = $1
`,
        [currentUserId]
      );
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    }
  });

  router.post("/tgl-like", async (req, res) => {
    console.log("like status changed")
    const client = await pool.connect();
    const { postId, userId } = req.body;
    try {
      await client.query("BEGIN");

      const { rows } = await client.query(
        `
    SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2
  `,
        [postId, userId]
      );

      if (rows.length > 0) {
        // If a like exists, delete it
        await client.query(
          `
      DELETE FROM likes WHERE post_id = $1 AND user_id = $2
    `,
          [postId, userId]
        );
      } else {
        // If a like doesn't exist, insert it
        await client.query(
          `
      INSERT INTO likes (post_id, user_id) VALUES ($1, $2)
    `,
          [postId, userId]
        );
      }

      await client.query("COMMIT");

      res.status(200).json({ message: "Operation successful" });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(err);
      res.status(500).send("An error occurred");
    } finally {
      client.release();
    }
  });

  return router;
};
