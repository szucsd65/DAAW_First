const { body, validationResult } = require("express-validator");

exports.registerValidators = [
  body("name")
    .notEmpty()
    .withMessage("A Name is required"),
  body("email")
    .isEmail()
    .withMessage("This Email is not valid")
    .normalizeEmail({ 
      remove_dots: false, 
      remove_extension: false, 
      gmail_remove_subaddress: false 
    }),
  body('password')
    .notEmpty()
    .withMessage("Password cannot be blank"),
  body("password-confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match");
    }
    return true;
  })
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.validationErrors = errors.array().map(err => err.msg);
    return next();
  }
  next();
};
