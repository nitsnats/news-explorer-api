const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

const {
  ER_MES_OK,
  ER_MES_CREATED,
} = require('../constants/error');

// GET returns all articles saved by the user
module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.status(ER_MES_OK).send({ data: articles })) // 200
    .catch((err) => next(new InternalServerError(err.message))); // 500
};

// DELETE deletes the stored article by _id
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findByIdAndRemove(articleId)
    .orFail(() => next(new NotFoundError('Article not found'))) // 404
    .then((article) => {
      res.status(ER_MES_OK).send({ message: 'Article has been deleted', article }); // 200
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Data format is incorrect'));// 400
      }
      if (err.status === 404) {
        return next(new NotFoundError(err.message));// 404
      }
      return next(new InternalServerError(err.message));// 500
    });
};

// POST  creates an article with keyword, title, text, date, source, link, and image in the body
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  const owner = req.user.id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(ER_MES_CREATED).send(article)) // 201
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Data format is incorrect'));// 400
      }
      return next(new InternalServerError(err.message));// 500
    });
};
