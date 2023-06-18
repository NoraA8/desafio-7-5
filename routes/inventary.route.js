import { Router } from "express";
import { inventaryController } from "../controllers/inventary.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js"

const router = Router();

router.get("/joyas", verifyJWT, inventaryController.getAllJewels);
router.get("/joyas/filtros", verifyJWT, inventaryController.getJewelsFilters);
router.get("/joyas/:id", verifyJWT, inventaryController.getIdJewel);
router.get("*", (req, res) => {
  res.status(404).send("Esta ruta no existe");
});

export default router;
