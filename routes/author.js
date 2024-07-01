const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async function (req, res) {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        console.log(searchOptions);
        console.log(req.query);
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions: req.query })
    } catch {
        res.redirect('/');
    }
})
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})
//create a new author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try {
        await author.save();
        res.redirect('/authors');
    } catch (err) {
        res.locals.errorMessage = 'Error creating Author'; // Set the error message
        res.render('authors/new', {
            author: author,
            errorMessage: res.locals.errorMessage
        });
    }
});


module.exports = router;
