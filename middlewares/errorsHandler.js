const { REFERENCE_ERROR } = require('../errors/reference-err');

const errorsHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || REFERENCE_ERROR;

  const message = statusCode === REFERENCE_ERROR
    ? 'На сервере произошла ошибка'
    : err.message;
  res.status(statusCode).send({ message });

  next();
};

module.exports = errorsHandler;
