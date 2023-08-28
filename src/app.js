const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ApiError = require("./utils/ApiError");
const app = express();
const router = require("./router");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json"); // Generated Swagger file
const fileUpload = require("express-fileupload");
const path = require("path");
const formData = require("express-form-data");

// Middlewares
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formData.parse());
app.use(loggerMiddleware);
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 },
  })
), // 1 MB
  app.use(
<<<<<<< Updated upstream
    "/rev-be/uploads",
=======
    // "/rev-be/uploads",
    "/uploads",
>>>>>>> Stashed changes
    express.static(path.join(__dirname, "../uploads"))
  );
// router index
app.use("/rev-be", router);
// api doc
app.use("/rev-be/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/rev-be", (req, res) => {
  res.send("BE-boilerplate v1.1");
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

module.exports = app;
