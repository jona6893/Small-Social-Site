const session = require("express-session");
const express = require("express");
const app = express();
const { Pool } = require("pg");
const pgSession = require("connect-pg-simple")(session);
const fileUpload = require("express-fileupload");
const cors = require("cors"); // Import the cors package
const port = process.env.PORT;;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the express-fileupload middleware
app.use(fileUpload());
// to connect to postgres using pg library
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Add session
app.use(
  session({
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: process.env.SESSION_DB_TABLE, // Use a custom table name (default is 'session')
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not accessible via JavaScript
      secure: false, // Set to true if using HTTPS
    },
  })
);
// Allow CORS for localhost
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to your frontend's address
    credentials: true,
    allowedHeaders: ["Content-Type"], // Allow necessary headers
    methods: ["GET", "POST"], // Allow necessary methods
  })
);


// Require the route files
const userRoutes = require("./routes/userupdates")(pool);
const feedRoutes = require("./routes/feed")(pool);
const signinRoutes = require("./routes/signin")(pool);
const signupRoutes = require("./routes/signup")(pool);

// Use the routes with your app
app.use("/", userRoutes);
app.use('/', feedRoutes);
app.use("/", signinRoutes);
app.use("/", signupRoutes);




// Server static files from the 'file' directory
app.use("/post_images", express.static("file/post_images"));
app.use("/users", express.static("file/users"));

// get data from postgres
app.get("/getData", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});


// search users route
app.get("/search-users", async (req, res) => {
  try {
    const client = await pool.connect();
    const searchTerm = req.query.searchTerm;
    const result = await client.query(
      "SELECT user_id, first_name, last_name FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1",
      [`%${searchTerm}%`]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});