const Cuisine = require("../../models/cuisine");

const createCuisine = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.cuisineImage = req.file.path;
        }
        const cuisine = await Cuisine.create(req.body);
        return res.status(201).json({ data: cuisine });
    } catch (error) {
        next(error);
    }
};

const getCuisines = async (req, res, next) => {
    try {
        const cuisines = await Cuisine.find();
        return res.status(200).json({ data: cuisines });
    } catch (error) {
        next(error);
    }
};

const getOneCuisine = async (req, res, next) => {
    try {
        const cuisine = await Cuisine.findById(req.params.id);
        return res.status(200).json({ data: cuisine });
    } catch (error) {
        next(error);
    }
};

const updateCuisine = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.cuisineImage = req.file.path;
        }
        const cuisine = await Cuisine.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({ data: cuisine });
    } catch (error) {
        next(error);
    }
};

const deleteCuisine = async (req, res, next) => {
    try {
        const cuisine = await Cuisine.findByIdAndDelete(req.params.id);
        return res.status(200).json({ data: cuisine });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCuisine,
    getCuisines,
    getOneCuisine,
    updateCuisine,
    deleteCuisine,
};

