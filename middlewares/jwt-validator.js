const { response } = require("express");
const { getValidateJWT } = require("../helpers/jwt");

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({ ok: false, msg: "Debe proveer el TOKEN" });
  }

  try {
    const { uid, name } = getValidateJWT(token);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({ ok: false, msg: "Token no válido" });
  }

  next();
};

module.exports = {
  validateJWT,
};
