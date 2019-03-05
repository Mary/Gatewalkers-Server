const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');


const Newsletter = require('../models/newslettersModel');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

const jsonParser = bodyParser.json();

///////////// Get All Newsletters as Admin
router.get('/view-newsletters', jwtAuth, (req, res, next) => {
    Newsletter.find()
        .sort({ updatedAt: 'desc' })
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            next(err);
        });
});///////// Get All Newsletters as End User

router.get('/news', (req, res, next) => {
    Newsletter.find()
        .sort({ updatedAt: 'desc' })
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            next(err);
        });
});



////////////// Create Newsletter
router.post('/newsletters', [jwtAuth, jsonParser], (req, res, next) => {
    const {author, title, date, intro, underwraps, qaTitle, qaContent, communitySpotlightFeature, communitySpotlightContent, fieldTitle, fieldContent} = req.body;
    const user_Id = req.user.id;

    if (!author || !title || !date || !intro || !underwraps || !qaTitle || !qaContent || !communitySpotlightContent || !communitySpotlightFeature ) {
        const err = new Error('Missing 1 or more `required field(s)` in request body');
        err.status = 400;
        return next(err);
    }


    const newNewsletter = { author, title, date, intro, underwraps, qaTitle, qaContent, communitySpotlightFeature, communitySpotlightContent, fieldTitle, fieldContent, user_Id };
    return Newsletter.create(newNewsletter)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            next(err);
        });
});


//////// Delete Newsletter
router.delete('/delete/:id', jwtAuth, (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('The `id` is not valid');
        err.status = 400;
        return next(err);
    }

    Newsletter.findOneAndRemove({ _id: id})
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;