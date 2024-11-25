import { Router } from "express";
import pool from "./database";
import { Request, Response } from "express";

const router = Router();

// Criar ticket de entrada
router.post("/tickets", async (req, res) => {
    const { placa, modelo, cor } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO tickets (placa, modelo, cor) VALUES ($1, $2, $3) RETURNING *",
            [placa, modelo, cor]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar ticket" });
    }
});

// Listar todos os tickets
router.get("/tickets", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tickets");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar tickets" });
    }
});

// Atualizar saída e calcular valor
router.patch("/tickets/:id", async (req, res) => {
    const { id } = req.params;
    const { saida, valor } = req.body;

    try {
        const result = await pool.query(
            "UPDATE tickets SET saida = $1, valor = $2 WHERE id = $3 RETURNING *",
            [saida, valor, id]
        );

        res.json(result.rows[0]);

    } catch (err) {
        console.error("Erro no servidor: ", err);
        res.status(500).json({ error: "Erro ao atualizar ticket" });
    }
});

export default router;
