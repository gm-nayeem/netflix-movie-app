// external import
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// internal import
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const movieRoute = require('./routes/movie')
const listRoute = require('./routes/list')

const app = express();


// middlewares
app.use(morgan('dev'));
app.use(cors());

// body-parser
app.use(express.json());


// routes
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)


app.get("/", (req, res) => {
    res.status(200).json("HI, I am from server!!")
});


// port and database connection
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server in running at http://localhost:${PORT}`);
    mongoose.connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true },
        () => {
            console.log('Database Connected Successfully...');
        }
    )
});




// package.json code
// "start": "node index.js",
//     "server": "nodemon index.js",
//     "client": "npm start --prefix ../client",
//     "admin": "npm start --prefix ../admin",
//     "dev": "concurrently \"npm run server\" \"npm run client\" "