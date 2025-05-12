import express from "express";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import attendanceRoutes from "./routes/attendanceRoute";
import leaveRoutes from "./routes/leaveRoutes";
import managerRoutes from "./routes/managerRoutes";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT","PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/emp", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/manager", managerRoutes);
// app.use(errorHandler);

export default app;
