const express = require('express');
const userRouter = express.Router();
const {signup, signin, getUser, updateUser, deleteUser} = require('./user.controller');

userRouter.post('/signup', signup);
userRouter.post('/login', signin);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
