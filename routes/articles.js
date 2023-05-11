const router = require('express').Router();

const {
  createArticle,
  getArticles,
  deleteArticle,
} = require('../controllers/articles');

const {
  validateArticle,
  validateId,
} = require('../middlewares/validators');

router.get('/', getArticles); // returns all articles saved by the user
router.post('/', validateArticle, createArticle); // creates an article with the passed keyword, title, text, date, source, link, and image in the body
router.delete('/:articleId', validateId, deleteArticle); // deletes the stored article by _id

module.exports = router;
