const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const ConflictError = require('../errors/ConflictError');

const {
  ER_MES_OK,
  ER_MES_CREATED,
} = require('../constants/error');

// GET
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(ER_MES_OK).send({ data: users })) // 200
    .catch((err) => next(new InternalServerError(err.message)));// 500
};

const getUserById = (userId, res, req, next) => {
  User.findById(userId)
    .orFail(() => next(new NotFoundError('User not found')))// 404
    .then((user) => {
      res.status(ER_MES_OK).send({ data: user }); // 200
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid user'));// 400
      }
      if (err.status === 404) {
        return next(new NotFoundError(err.message));// 404
      }
      return next(new InternalServerError(err.message));// 500
    });
};

// GET
module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  getUserById(userId, res, req);
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user.id;
  getUserById(userId, res, req);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const secret = NODE_ENV === 'production' ? JWT_SECRET : 'development-secret';
      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: '7d',
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnAuthorizedError('Login information is incorrect, check either email or password')); // 401
    });
};

// POST
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new ConflictError('Email already exists'));// 409
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(ER_MES_CREATED).send({
      data: user,
    })) // 201  //data:users
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message)
          .join(', ')}`));
      }
      return next(new InternalServerError('An error occured'));// 500
    });
};
