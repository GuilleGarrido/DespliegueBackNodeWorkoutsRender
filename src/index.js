const express = require("express");
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const apicache = require("apicache");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");//new

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;//new

app.use(bodyParser.json());//app.use(express.json());
/**
 * new//tiene que estar aqui la capa porque si lo ponemos después del endpoint no funcionaria...
 * Esto si es secuencial (de lo poco de JS...):
 */
app.use(cache("1 minutes"));
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);//new
});
