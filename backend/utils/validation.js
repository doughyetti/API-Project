// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const errObj = {
      message: 'Validation error',
      statusCode: 400,
      errors: [
        'Email is required',
        'Password is required'
      ]
    }
    return _res.status(400).json(errObj);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
