import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import tickets from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", router);
app.use("/tickets", tickets);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
