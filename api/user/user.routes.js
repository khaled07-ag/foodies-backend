const express = require('express');
const userRouter = express.Router();
const upload = require('../../middlewares/multer');
const passport = require('passport');
const {signup, signin, getUser, updateUser, deleteUser, getAllUsers} = require('./user.controller');

userRouter.post('/signup', upload.single('userImage'), signup);
userRouter.post('/signin', passport.authenticate('local', {session: false}), signin);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', upload.single('userImage'), updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
