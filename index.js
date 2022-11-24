const express = require('express');
const mongoose = require('mongoose');
const {unless} = require('express-unless');

const app = express();

//Loading the config file......
const dbConfig = require('./config/db.config');

//Loading the middlewares....
const auth = require('./middlewares/auth')
const errors = require('./middlewares/errors');
const { append } = require('express/lib/response');

//Connecting the db....
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('Database connected!!!');
    },
    (error) => {
        console.log("Database can't be connected: " + error);
    },
);

auth.authenticateToken.unless = unless;

app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"] },
            { url: "/users/register", methods: ["POST"] },
        ],
    })
);

app.use(express.json());
app.use("/users", require('./routes/users.routes'));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000, ()=>{
    console.log('Ready to Go!');
});

