const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./database');
const userRouter = require('./api/user/user.routes');
const recipeRouter = require('./api/recipe/recipe.routes');
const cuisineRouter = require('./api/cuisine/cuisine.routes');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const path = require('path');
const {localStrategy, JwtStrategy} = require('./middlewares/passport'); 
//intiate
dotenv.config();
connectDB();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
passport.use('local',localStrategy);
passport.use('jwt',JwtStrategy);
app.use("/media",express.static(path.join(__dirname, 'media')));
//routes
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/cuisines', cuisineRouter);



//error handling
app.use(notFoundHandler);
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
