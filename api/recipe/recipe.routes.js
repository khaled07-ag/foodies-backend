const express = require("express");
const recipeRouter = express.Router();
const upload = require("../../middlewares/multer");
const {
  createRecipe,
  getRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./recipe.contoller");
const passport = require("passport");

recipeRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipe
);
recipeRouter.get("/", getRecipes);
recipeRouter.get("/:id", getOneRecipe);
recipeRouter.put("/:id", upload.single("recipeImage"), updateRecipe);
recipeRouter.delete("/:id", deleteRecipe);
recipeRouter.get("/user/:id");
module.exports = recipeRouter;
