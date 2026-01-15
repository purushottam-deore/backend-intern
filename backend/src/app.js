const express = require('express');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');


const app = express();
const authRoutes = require('./routes/v1/auth.routes');

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/tasks", require("./routes/v1/task.routes"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



module.exports = app;
