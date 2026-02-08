import express from "express";
import cors from "cors";

import travelsRoutes from "./routes/travels.routes.js";
import routesRoutes from "./routes/routes.routes.js";
import busRoutes from "./routes/bus.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/travels", travelsRoutes);
app.use("/api/routes", routesRoutes);
app.use("/api/buses", busRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("GoBus Backend API");
});

export default app;