const jwt = require("jsonwebtoken");

/**
 * Generar JWT
 * @param {*} uid
 * @param {*} name
 * @returns
 */
const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

const validateJWT = (token) => {
  const { uid, name } = jwt.verify(token, process.env.SECRET_KEY);

  return { uid, name };
};

module.exports = {
  generateJWT,
  getValidateJWT: validateJWT,
};
