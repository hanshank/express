// moment is a wrapper around the Date object in JS
const moment = require('moment');

require('dotenv').config();
const express = require('express');
const path = require('path');
// const logger = require('./middleware/logger');
const commentsRouter = require('./routes/comments');

const app = express();

// Routing in Express uses the HTTP keywords/verbs
// app.get();
// app.post();
// etc...

// When express gets it's requests, it will go into your app
// And your app will send it along a middleware chain
// A bunch of functions that will modify requests in different ways. Like a pipeline
// It can add cookies to your requests etc...

// Set up middleware!

// body parser middleware
app.use(express.json());
// form data
app.use(express.urlencoded({ extended: false }));

// logger middleware
// app.use(logger);

// static middleware
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/api/comments', commentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
