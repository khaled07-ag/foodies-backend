const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const Cuisine = require("../../models/cuisine");
dotenv.config();
 
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    return token;
}
const signup = async (req, res, next) => {
try {
    
    const {password} = req.body;
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    if(req.file){
        req.body.userImage = req.file.path;
    }
    const newUser = await User.create(req.body);
    const token = await generateToken(newUser)
    return res.status(200).json({token: token});
} catch (error) {
    console.log(error)
    next(error);
}
  
};
const signin = async (req, res, next) => {
try {
  const token = generateToken(req.user);
  return res.status(200).json({token: token});
} catch (error) {
    next(error);
    
}
}
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).populate('Cuisines').populate('recipes');
        return res.status(200).json({data: user});
    } catch (error) {
        console.log(error);
        next(error);
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({data: users});
    } catch (error) {
        next(error);
    }
}
const updateUser = async (req, res, next) => {
    try {
        console.log(req.file)
        
        if (req.file) {
            req.body.userImage = req.file.path;
        };
        const updatedCuisine = await Cuisine.updateMany(
            {_id: req.body.cuisines}, 
            {$push: {User: req.user.id}}
        );

        const updateUser = await User.findByIdAndUpdate(req.user.id, {
            $set: {
                ...req.body
            }
        });
        
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $push: {Cuisines: req.body.cuisines}
        });
        

        return res.status(200).json({data: updatedUser});
    } catch (error) {
        next(error);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({data: user});
    } catch (error) {
        next(error);
    }
}
const getOneUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({data: user});
    } catch (error) {
        next(error);
    }
}

module.exports = {
  signup,
  signin,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getOneUser,
};

