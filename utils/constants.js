// VALIDATION REGEX
const LINK_REGEXP = /^http[s]?:\/\/(www\.)?(.)?\/?(.)/i;
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&‘*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PASS_REGEXP = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

// CONFIG
const { JWT_SECRET = 'JWT_SECRET' } = process.env;
// const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/newsdb' } = process.env;
// const { DB_ADDRESS = 'mongodb://localhost:27017/newsdb' } = process.env;
const DB_ADDRESS = 'mongodb://127.0.0.1:27017/newsdb';

// STATUS CODE
const ER_MES_OK = 200;
const ER_MES_CREATED = 201;
const ER_MES_BAD_REQUEST = 400;
const ER_MES_UNSUTHORIZED_ERROR = 401;
const ER_MES_NOT_FOUND = 404;
const ER_MES_INTERNAL_SERVER_ERROR = 500;
const ER_MES_CONFLICT_ERROR = 409;
const ER_MES_FORBIDDEN_ERROR = 403;

// STATUS MESSAGES
const INVALID_DATA_MESSAGE = 'This input is invalid data';
const USER_NOT_FOUND_MESSAGE = 'This user id is not exist';
const UNAUTHORIZED_MESSAGE = 'Authorization Required';
const FORBIDDEN_MESSAGE = 'Forbidden action';
const ARTICLE_NOT_FOUND_MESSAGE = 'This card id is not exist';
const SERVER_ERROR_MESSAGE = 'An error acured with the server';
const DATA_EXIST_MESSAGE = 'This user already exist';

// VALIDATION MESSAGES
const MIN_STR_MESSAGE = 'Input must be at least 2 characters long!';
const MAX_STR_MESSAGE = 'Input must be less then 30 characters long!';
const EMPTY_STR_MESSAGE = 'Required input!';
const VALID_EMAIL_MESSAGE = 'Valid Email is required!';
const VALID_URL_MESSAGE = 'Valid url link is required!';

module.exports = {
  LINK_REGEXP,
  EMAIL_REGEXP,
  PASS_REGEXP,
  JWT_SECRET,
  DB_ADDRESS,
  ER_MES_OK,
  ER_MES_CREATED,
  ER_MES_BAD_REQUEST,
  ER_MES_UNSUTHORIZED_ERROR,
  ER_MES_NOT_FOUND,
  ER_MES_INTERNAL_SERVER_ERROR,
  ER_MES_CONFLICT_ERROR,
  ER_MES_FORBIDDEN_ERROR,
  INVALID_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  FORBIDDEN_MESSAGE,
  ARTICLE_NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
  DATA_EXIST_MESSAGE,
  MIN_STR_MESSAGE,
  MAX_STR_MESSAGE,
  EMPTY_STR_MESSAGE,
  VALID_EMAIL_MESSAGE,
  VALID_URL_MESSAGE,
};
