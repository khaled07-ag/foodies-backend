const express = require("express");
const recipeRouter = express.Router();
const upload = require('../../middlewares/multer');
const {
  createRecipe,
  getRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./recipe.contoller");

recipeRouter.post("/:userId",upload.single("recipeImage"), createRecipe);
recipeRouter.get("/", getRecipes);
recipeRouter.get("/:id", getOneRecipe);
recipeRouter.put("/:id",upload.single("recipeImage"), updateRecipe);
recipeRouter.delete("/:id", deleteRecipe);

module.exports = recipeRouter;

