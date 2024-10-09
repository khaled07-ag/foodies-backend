const Recipe = require("../../models/recipes");
const User = require("../../models/user");
const Cuisine = require("../../models/cuisine");

const createRecipe = async (req, res, next) => {
  try {
    const recipeData = { ...req.body, user: req.user._id };
    if (req.file) {
      recipeData.recipeImage = req.file.path;
    }

    console.log(recipeData);

    let cuisine = await Cuisine.findOne({ name: recipeData.cuisine });
    if (!cuisine) {
      const newCuisine = await Cuisine.create({
        name: recipeData.cuisine,
        user: req.user._id,
      });
      recipeData.cuisine = newCuisine._id;
    } else {
      const updatedCuisine = await Cuisine.findByIdAndUpdate(cuisine._id, {
        $push: { User: req.user._id },
      });
      recipeData.cuisine = cuisine._id;
    }
    const recipe = await Recipe.create(recipeData);

    const updatedCuisine = await Cuisine.findByIdAndUpdate(recipeData.cuisine, {
      $push: { recipes: recipe._id },
    });
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
      $push: { recipes: recipe._id },
    });
    return res.status(201).json({ data: recipe });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate("user");
    return res.status(200).json({ data: recipes });
  } catch (error) {
    next(error);
  }
};

const getOneRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("cuisine")
      .populate("user");
    return res.status(200).json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.recipeImage = req.file.path;
    }
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    return res.status(200).json({ data: recipe });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createRecipe,
  getRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
};
