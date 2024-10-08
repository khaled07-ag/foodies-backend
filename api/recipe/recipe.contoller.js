const Recipe = require("../../models/recipes");
const User = require("../../models/user");
const createRecipe = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const recipeData = {...req.body, userId};
    if (req.file) {
      recipeData.recipeImage = req.file.path;
    };
    const recipe = await Recipe.create(recipeData);
    
    const user = await User.findByIdAndUpdate(userId, {
        $push: {recipes: recipe._id}
    });
    console.log(user);
    return res.status(201).json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    return res.status(200).json({ data: recipes });
  } catch (error) {
    next(error);
  }
};

const getOneRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
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
