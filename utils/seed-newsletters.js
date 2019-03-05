'use strict';

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');

const Newsletters = require('../models/newslettersModel');
const User = require('../models/userModel');

const {
  newsletters,
  users
} = require('../dummydata/dummydata');

console.log(`Connecting to mongodb at ${DATABASE_URL}`);
mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.info('Delete Data');
    return Promise.all([
      Newsletters.deleteMany(),
      User.deleteMany(),
    ]);
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      Newsletters.insertMany(newsletters),
      User.insertMany(users)
    ]);
  })
  .then(results => {
    console.log('Inserted', results);
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });