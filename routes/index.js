const router = require('express').Router();
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');
const { validateLogin } = require('../middlewares/validators');

const userRouter = require('./users');
const articleRouter = require('./articles');

router.post('/signup', validateLogin, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users',userRouter);
router.use('/articles',articleRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
