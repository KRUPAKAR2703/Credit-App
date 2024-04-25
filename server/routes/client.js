import express from "express";
import {
  getLoans,
  submitFormData,
  getUserRole,
} from "../controllers/client.js";

const router = express.Router();

router.get("/loans", getLoans);
router.post("/submit", submitFormData);
router.get("/roles", getUserRole);

export default router;
