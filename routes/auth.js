/*
    Rutas de usuarios / auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, refreshToken } = require("../controllers/auth");
const { fieldsValidators } = require("../middlewares/fields-validators");
const { validateJWT } = require("../middlewares/jwt-validator");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("password", "Invalid password length").isLength({ min: 6 }),
    fieldsValidators,
  ],
  loginUser
);

router.post(
  "/new",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("password", "Invalid password length").isLength({ min: 6 }),
    fieldsValidators,
  ],
  createUser
);
router.get("/renew", validateJWT, refreshToken);

module.exports = router;
