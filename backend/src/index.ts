import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import foodRoutes from "./routes/foodRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/foods", foodRoutes);

app.get("/", (req, res) => res.send("Backend rodando!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
