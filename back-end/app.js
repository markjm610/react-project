const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { environment } = require('./config');

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));


const usersRouter = require('./routes/users');
const columnsRouter = require('./routes/columns');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

app.use(usersRouter);
app.use(columnsRouter);
app.use(projectsRouter);
app.use(tasksRouter);


// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.status = 404;
    next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        stack: isProduction ? null : err.stack,
        errors: err.errors
    });
});


module.exports = app;