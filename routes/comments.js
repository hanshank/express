// routing
const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const commentData = require('../data');

// create the db file if it doesn't exist
// and seed it with data
const adapter = new FileSync('db.json', {
  defaultValue: { comments: commentData },
});

const db = lowdb(adapter);

const router = express.Router();

// get all comments
router.get('/', (req, res) => {
  const comments = db.get('comments').value();
  res.json(commentData);
});

// get a single comment by id
router.get('/:id', (req, res) => {
  const myComment = db
    .get('comments')
    .find({ id: req.params.id })
    .value();
  if (myComment) {
    res.json(myComment);
  } else {
    res.status(404).json({ msg: 'Invalid ID' });
  }
});

// {
//   text: 'Love this!',
//   id: 1,
//   timestamp: '2019-02-22T08:45:37-08:00'
// },

// create a new comment with the text

// timestamp: moment()
// id should be shortid

// add it to commentdata

// return all the comments (make sure the new comment is included!)
// BONUS: if request hbas no body text (or text is empty), send proper error code

// create a comment
router.post('/', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ msg: 'Invalid input' });
  }

  const newComment = {
    text: req.body.text,
    id: shortid.generate(),
    timestamp: moment().format(),
  };

  // add it to commentdata

  db.get('comments')
    .push(newComment)
    .write();

  res.status(201).json({
    msg: 'Comment succesfully added!',
    comments: db.get('comments').value()
  });
});

// Update a comment
router.put('/:id', (req, res) => {
  // const myComment = commentData.find(comment => comment.id === parseInt(req.params.id));

  if (!req.body.text) {
    return res.status(400).json({ msg: 'You can do better! Try adding some text next time...' });
  }

  if (
    !db
      .get('comments')
      .find({ id: req.params.id })
      .value()
  ) {
    res.status(404).json({ msg: 'That comment does not exist dude!' });
  }
  // else if (!myComment) {
  //   res.status(404).json({ msg: 'That comment does not exist dude!' });
  // }

  db.get('comments')
    .find({ id: req.params.id })
    .assign({ text: req.body.text, updatedAt: moment().format() })
    .write();

  // myComment.text = req.body.text;
  // myComment.updatedAt = moment().format();

  // myComment = {
  //   ...myComment,
  //   text: req.body.text,
  //   updatedAt: moment().format(),
  // };

  res.json({ comments: db.get('comments') });

  res.status(201).json({ msg: 'Comment succesfully added!', comments: db.get('comments') });
});

router.delete('/:id', (req, res) => {
  if (
    !db
      .get('comments')
      .find({ id: req.params.id })
      .value()
  ) {
    res.status(404).json({ msg: 'That comment does not exist dude!' });
  }

  db.get('comments')
    .remove({ id: req.params.id })
    .write();

  res.status(202).json({
    msg: 'Comment succesfully deleted',
    comments: db.get('comments').value()
  });
});

module.exports = router;
