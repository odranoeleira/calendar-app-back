const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const { generateJWT } = require("../helpers/jwt");

/**
 * Crear un usuario
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    //console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ ok: false, msg: "Existe un usuario con ese correo" });
    }
    user = new User(req.body);

    //Encriptar password
    const salt = bcrypt.genSaltSync(); //Por defecto 10
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    //Generar JWT
    const token = await generateJWT(user._id, user.name);
    res.status(201).json({ ok: true, uid: user._id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Comuniquese con el administrador" });
  }
};

/**
 * Login del usuario
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    //console.log(user);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario o la contraseña no son correctos",
      });
    }

    //Confirmar password
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.status(400).json({ ok: true, msg: "Password incorrecto" });
    }

    //Generar JWT
    const token = await generateJWT(user._id, user.name);
    res.status(200).json({ ok: true, uid: user._id, name: user.name, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Comuniquese con el administrador" });
  }
};

/**
 * Token refresh
 * @param {*} req
 * @param {*} res
 */
const refreshToken = async (req, res = response) => {
  //Viene del middleware
  const { uid, name } = req;
  const token = await generateJWT(uid, name);

  res.json({ ok: true, uid, name, token });
};

module.exports = {
  createUser,
  loginUser,
  refreshToken,
};
