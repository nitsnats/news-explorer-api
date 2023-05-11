const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const {
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
  VALID_EMAIL_MESSAGE,
  LINK_REGEXP,
} = require('../utils/constants');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Login validation
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(VALID_EMAIL_MESSAGE)
      .messages({
        'string.empty': EMPTY_STR_MESSAGE,
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': MIN_STR_MESSAGE,
        'string.empty': EMPTY_STR_MESSAGE,
      }),
  }),
});

// User validation
const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
    .message(VALID_EMAIL_MESSAGE)
    .messages({
      'string.empty': EMPTY_STR_MESSAGE,
    }),
    password: Joi.string().required().min(8)
    .messages({
      'string.min': MIN_STR_MESSAGE,
      'string.empty': EMPTY_STR_MESSAGE,
    }),
    name: Joi.string().min(2).max(30)
    .messages({
      'string.min': MIN_STR_MESSAGE,
      'string.max': MAX_STR_MESSAGE,
    }),
  }),
});

// Article validation
const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'string.required': 'Keyword is required',
    }),
    title: Joi.string().required().messages({
      'string.required': 'Title is required',
    }),
    text: Joi.string().required().messages({
      'string.required': 'Text is required',
    }),
    date: Joi.string().required().messages({
      'string.required': 'Date is required',
    }),
    source: Joi.string().required().messages({
      'string.required': 'Source is required',
    }),
    link: Joi.string().required().pattern(LINK_REGEXP).messages({
      'string.uri': 'Valid image required',
      'string.required': 'Link is required',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      'string.required': 'Image is required',
      'string.uri': 'Valid image required',
    }),
  }),
});

// Id article validation
const validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid id');
    }),
  }),
});

// Id user validation
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid id');
    }),
  }),
});

module.exports = {
  validateURL,
  validateId,
  validateUserId,
  validateArticle, // router.post('/articles', validateArticle, createArticle);
  validateUser, // app.post('/signup', validateUser, createUser);
  validateLogin, // app.post('/signin', validateLogin, login);
};
