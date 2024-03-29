const mongoose = require('mongoose');
const { LINK_REGEXP } = require('../utils/constants');

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: [true, 'The "keyword" field must be filled in'],
    },
    title: {
      type: String,
      required: [true, 'The "title" field must be filled in'],
    },
    text: {
      type: String,
      required: [true, 'The "text" field must be filled in'],
    },
    date: {
      type: String,
      required: [true, 'The "date" field must be filled in'],
    },
    source: {
      type: String,
      required: [true, 'The "source" field must be filled in'],
    },
    link: {
      type: String,
      required: [true, 'The "Link" field must be filled in'],
      validate: {
        validator(v) {
          return LINK_REGEXP.test(v);
        },
        message: 'Sorry. the link is not valid!',
      },
    },
    image: {
      type: String,
      required: [true, 'The "image" field must be filled in'],
      validate: {
        validator(v) {
          return LINK_REGEXP.test(v);
        },
        message: 'Sorry. the link is not valid!',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'The "Owner" field must be filled in'],
    },
  },
);

module.exports = mongoose.model('article', articleSchema);
