const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
 
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
const generateToken = (user) => {
    const payload = {
        id: user._Id,
        username: username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
    return token;
}
const signup = async (req, res, next) => {
try {
    const {password} = req.body;
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = await generateToken(newUser);
    return res.status(200).json({token: token});
} catch (error) {
    next(error);
}
  
};
const signin = async (req, res, next) => {
    try {
  const user = await generateToken(req.user);
  return res.status(200).json({data: user});
} catch (error) {
    next(error);
}
}
module.exports = {
  signup,
  signin,
};

