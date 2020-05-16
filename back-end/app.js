const express = require("express");
const { environment } = require('./config');
const path = require('path');

if (environment !== 'production') {
    require('dotenv').config();
}

const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors({ origin: true }));


const usersRouter = require('./routes/users');
const columnsRouter = require('./routes/columns');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const invitesRouter = require('./routes/invites');
const usersProjectsRouter = require('./routes/usersprojects');

app.use(usersRouter);
app.use(columnsRouter);
app.use(projectsRouter);
app.use(tasksRouter);
app.use(invitesRouter);
app.use(usersProjectsRouter);


app.use(express.static(path.join(__dirname, '/../front-end/react-project/build')));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../front-end/react-project/build/index.html'));
});

app.get('/', (req, res) => {
    res.json({
        message: 'TEST INDEX ROOT'
    })
});

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
        stack: isProduction ? err.stack : err.stack,
        errors: err.errors
    });
});


module.exports = app;