const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

// Crear el servidor de express
const app = express();
const port = 8080;

//Conexión a la base de mongo
dbConnection();

//CORS
app.use(cors());
// Directorio público
app.use(express.static("public")); //middleware

//Lectura y parseo del body
app.use(express.json());

// Rutas
// TODO: auth
app.use("/api/auth", require("./routes/auth"));

// TODO: events
app.use("/api/events", require("./routes/events"));

// Escuchar peticiones
app.listen(process.env.PORT || port, () =>
  console.log(`Runnning on port ${process.env.PORT || port}`)
);
