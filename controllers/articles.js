const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

const {
  ER_MES_OK,
  ER_MES_CREATED,
  // ER_MES_BAD_REQUEST,
  // ER_MES_NOT_FOUND,
  // ER_MES_INTERNAL_SERVER_ERROR,
} = require('../constants/error');

// GET returns all articles saved by the user
module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.status(ER_MES_OK).send({ data: articles })) // 200
    .catch((err) => next(new InternalServerError(err.message)));
  // res.status(ER_MES_INTERNAL_SERVER_ERROR).send(
  //  { message: err.message }, 'An error occured')); // 500
};

// DELETE deletes the stored article by _id
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findByIdAndRemove(articleId)
    .orFail(() => next(new NotFoundError('Article not found'))) // 404
  // const error = new Error({ message: 'Article not found' });
  // error.statusCode = ER_MES_NOT_FOUND; // 404
  // throw error;
  // return next(new NotFoundError('Article not found')); // 404
  // })
    .then((article) => {
      res.status(ER_MES_OK).send({ message: 'Article has been deleted', article }); // 200
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // res.status(ER_MES_BAD_REQUEST).send({ message: 'Invalid article Id' }); // 400
        return next(new BadRequestError('Data format is incorrect'));// 400
      }
      if (err.status === 404) {
        // res.status(ER_MES_NOT_FOUND).send({ message: err.message }); // 404
        return next(new NotFoundError(err.message));// 404
      }
      // res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: err.message }); // 500
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
        // res.status(ER_MES_BAD_REQUEST).send({ message: 'Data format is incorrect' }); // 400
        return next(new BadRequestError('Data format is incorrect'));// 400
        // res.status(400).send(err.message)
      }
      // res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: err.message }); // 500
      return next(new InternalServerError(err.message));// 500
    });
};

//   .orFail(() => {
//     const error = new Error("No article found with that id");
//     error.statusCode = 404;
//     throw error;
//   })
//   .then(article => {
//       res.status(200).send({ message: '', data: article })
//   })
//   .catch(err => {
//     if(err.name === 'CastError') {
//       res.status(400).send('Invalid format of Id')
//     } else if (err.status === 404) {
//       res.status(404).send({ message: err.message })
//     } else {
//       res.status(500).send({ message: "Something went worng" })
//     }
// });
// }

// const updateLikes = (req, res, operator, next) => {
//   const { articleId } = req.params;
//   const userId = req.user.id;

//   Article.findByIdAndUpdate(
//     articleId,
//     { [operator]: { likes: userId } },
//     { new: true },
//   )
//     .orFail(() => next(new BadRequestError('Article not found'))) // 400
//   // const error = new Error('Article not found');
//   // error.statusCode = ER_MES_BAD_REQUEST; // 400
//   // throw error;
//   // return next(new BadRequestError('Article not found'));
//   // })
//     .then((article) => {
//       res.status(ER_MES_OK).send(article); // 200
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         // res.status(ER_MES_BAD_REQUEST).send({ message: 'Article id is incorrect' }); // 400
//         return next(new BadRequestError('Article id is incorrect'));
//       }
//       if (err.status === 404) {
//         // res.status(ER_MES_NOT_FOUND).send({ message: err.message }); // 404
//         return next(new NotFoundError(err.message));
//       }
//       // res.status(ER_MES_INTERNAL_SERVER_ERROR).send({ message: 'An error occured' }); // 500
//       return next(new InternalServerError(err.message));
//     });
// };

// module.exports.Article = (req, res) => updateLikes(req, res, '$addToSet');
// module.exports.dislikeArticle = (req, res) => updateLikes(req, res, '$pull');
