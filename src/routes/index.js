const { Router } = require("express");
const router = Router();

const {
  getUserByID,
  getUserByIDPerTotCat,
  getUserByIDPerTot,
} = require("../controllers/index.controller");

router.get("/users/:id", getUserByID);
router.get("/users/categoria/:id", getUserByIDPerTotCat);
router.get("/users/total/:id", getUserByIDPerTot);
module.exports = router;
