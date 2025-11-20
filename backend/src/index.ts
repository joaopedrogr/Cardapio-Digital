import express from "express";
import cors from "cors";
import foodRoutes from "./routes/foodRoutes";
import authRoutes from "./routes/authRoutes";
import aiRoutes from "./routes/aiRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => res.send("Backend rodando!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
