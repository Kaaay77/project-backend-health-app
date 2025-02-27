require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT


const app = express();
require("./config")(app);


// 👇 MIDDLEWARE MISSING
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

const pruebasRouter = require("./routes/pruebas.routes");
app.use("/api/pruebas",isAuthenticated, pruebasRouter);           

const profileRouter = require("./routes/profile.routes");
app.use("/api/profile", isAuthenticated, profileRouter); 

const carritoRouter = require("./routes/pruebas.routes");
app.use("/api/carrito", isAuthenticated, carritoRouter);  

const taskRouter = require("./routes/task.routes");
app.use("/api",isAuthenticated, taskRouter);            // <== UPDATE


// app.use((req, res, next) => {
//     // If no routes match, send them the React HTML.
//     res.sendFile(__dirname + "/public/index.html");
//   });

// require("./error-handling")(app);

module.exports = app;
