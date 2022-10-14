const express = require('express');
const sequelize = require('./db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/task", require("./controllers/task_controller"));
app.use("/api/user", require("./controllers/user_controller"));

const startDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

try {
    startDB();
    app.listen(port, () => {
        console.log("Server started on port " + port);
    });
} catch (err) {
    console.log(err.message);
    process.exit(1);
}
