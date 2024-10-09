const express = require('express');
const userRouter = express.Router();
const upload = require('../../middlewares/multer');
const passport = require('passport');
const {signup, signin, getUser, updateUser, deleteUser, getAllUsers, getOneUser} = require('./user.controller');

userRouter.post('/signup', upload.single('userImage'), signup);
userRouter.post('/signin', passport.authenticate('local', {session: false}), signin);
userRouter.get('/', getAllUsers);
userRouter.get('/profile',passport.authenticate('jwt', {session: false}), getUser);
userRouter.put('/', passport.authenticate('jwt', {session: false}), upload.single('userImage'), updateUser);
userRouter.get('/:id', getOneUser);
userRouter.delete('/:id', passport.authenticate('jwt', {session: false}), deleteUser);

module.exports = userRouter;
