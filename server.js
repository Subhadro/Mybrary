if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);

// Handle MongoDB connection events
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use(bodyParser.urlencoded({ extended: true }));


const indexRouter = require('./routes/index');
const authorRouter = require('./routes/author');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/authors', authorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
