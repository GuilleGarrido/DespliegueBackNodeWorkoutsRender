const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Crossfit WOD API", version: "1.0.0" },
  },
  apis: ["src/v1/routes/workoutRoutes.js", "src/database/Workout.js"],
};

// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

/// Function to setup our docs
/**
 * Básicamente lo que estamos diciendo es que con el endpoint de api/v1 sustituyendo
 * workouts por docs nos lanza un middleware que nos mostrará el verdadero endpoint...
 * Gracias a las opciones que hemos puesto antes.
 * Se puede visualizar en formato json
 * @param {*} app 
 * @param {*} port 
 */
const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `📓 Version 1 Docs are available at http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };