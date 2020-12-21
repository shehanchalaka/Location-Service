import { Router } from "express";
import { Maps } from "../services";

const router = Router();

router.get("/geocode", (req, res, next) => {
  Maps.geocode(req.query)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

router.get("/autocomplete", (req, res, next) => {
  Maps.autocomplete(req.query)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

export default router;
