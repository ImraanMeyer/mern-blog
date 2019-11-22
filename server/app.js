const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/config');

// Initializing express to a constant
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Connecting MongoDb
connectDB();

// Calling Routes
const routes = [
    require('./api/routes/users'), 
    require('./api/routes/admin'), 
    require('./api/routes/posts')
];

// Using Routes
app.use('/users', routes[0]);
app.use('/admin', routes[1]);
app.use('/posts', routes[2]);

// Establishing Port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`fun @ port: ${PORT}`));