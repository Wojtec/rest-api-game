const express = require("express");

const router = express.Router();

/**
 *
 * OBJECT ROUTES
 *
 * */

const {
  addObject,
  getById,
  destroyObject,
  upgradeObject,
} = require("../controllers/object");

// Clients routes
router.get("/:id", getById);
router.post("/add", addObject);
router.patch("/:id/upgrade", upgradeObject);
router.delete("/:id", destroyObject);

module.exports = router;
