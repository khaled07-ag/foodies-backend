const express = require("express");
const cuisineRouter = express.Router();
const upload = require('../../middlewares/multer');
const {
  createCuisine,
  getCuisines,
  getOneCuisine,
  updateCuisine,
  deleteCuisine,
} = require("./cuisine.controller");

cuisineRouter.post("/",upload.single("cuisineImage"), createCuisine);
cuisineRouter.get("/", getCuisines);
cuisineRouter.get("/:id", getOneCuisine);
cuisineRouter.put("/:id",upload.single("cuisineImage"), updateCuisine);
cuisineRouter.delete("/:id", deleteCuisine);

module.exports = cuisineRouter;

