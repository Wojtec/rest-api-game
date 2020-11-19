const express = require("express");

const router = express.Router();

/**
 *
 * PLAYER ROUTES
 *
 * */

const {
  allPlayers,
  addPlayers,
  getById,
  armPlayer,
  killPlayer,
  atack,
  steal,
  resurrect,
  useObject,
} = require("../controllers/player");

// Clients routes

router.get("/", allPlayers);
router.get("/:id", getById);
router.get("/:id/atack/:target", atack);
router.get("/:id/steal/:target", steal);
router.get("/:id/resurrect", resurrect);
router.get("/:id/kill", killPlayer);
router.get("/:id/arm/:armId", armPlayer);
router.put("/:id/object/:objectId", useObject);
router.post("/add", addPlayers);

module.exports = router;
