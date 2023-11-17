const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const personRoutes = require('./routes/personRoutes');



const app = express();
var corsOptions = {
    origine : "*",
    Credential: "true",
};


app.options("*", cors());
app.use(cors(corsOptions));

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/person", personRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));