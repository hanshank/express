// routing
const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const fs = require('fs').promises;
const path = require('path');
const commentData = require('../data');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(commentData);
});

// get a single comment by id
router.get('/:id', (req, res) => {
  const myComment = commentData.find(comment => comment.id === parseInt(req.params.id));
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

  commentData.push(newComment);

  res.status(201).json({ msg: 'Comment succesfully added!', comments: commentData });
});

// Update a comment
router.patch('/:id', (req, res) => {
  const myComment = commentData.find(comment => comment.id === parseInt(req.params.id));

  if (!req.body.text) {
    res.status(400).json({ msg: 'You can do better! Try adding some text next time...' });
  } else if (!myComment) {
    res.status(404).json({ msg: 'That comment does not exist dude!' });
  }

  myComment.text = req.body.text;
  myComment.updatedAt = moment().format();

  // myComment = {
  //   ...myComment,
  //   text: req.body.text,
  //   updatedAt: moment().format(),
  // };

  res.json({ comments: commentData });

  res.status(201).json({ msg: 'Comment succesfully added!', comments: commentData });
});

router.delete('/:id', (req, res) => {
  const myComment = commentData.find(comment => comment.id === parseInt(req.params.id));

  if (!myComment) {
    res.status(404).json({ msg: 'That comment does not exist dude!' });
  }

  commentData.splice(commentData.id, 1);

  res.status(202).json({
    msg: 'See you later sucker! That comment is out of here....',
    comments: commentData,
  });
});

module.exports = router;
