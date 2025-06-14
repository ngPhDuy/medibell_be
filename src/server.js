const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerOptions");
const { sequelize } = require("./models/index");
const http = require("http");
// Routes
const userRoutes = require("./routes/user.route");
const medicineRoutes = require("./routes/medicine.route");
const authRoutes = require("./routes/auth.route");
const medicineScheduleRoutes = require("./routes/medicineSchedule.route");
const tokenRoutes = require("./routes/token.route");
const cloudRoutes = require("./routes/cloud.route");

//Cron job
const {
  medicineScheduleReminder,
} = require("./cronjobs/sendMedScheNotification.cron.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use(cors());

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/medicine_schedules", medicineScheduleRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/cloud", cloudRoutes);

// Start cronjob
medicineScheduleReminder();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
