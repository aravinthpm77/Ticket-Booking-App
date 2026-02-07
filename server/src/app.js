import express from "express";
import cors from "cors";

import travelsRoutes from "./routes/travels.routes.js";
// later:
// import busRoutes from "./routes/bus.routes.js";
// import routeRoutes from "./routes/routes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/travels", travelsRoutes);
// app.use("/api/buses", busRoutes);
// app.use("/api/routes", routeRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("GoBus Backend API");
});

export default app;