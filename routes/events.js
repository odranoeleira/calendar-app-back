/*
    Rutas de eventos
    host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { fieldsValidators } = require("../middlewares/fields-validators");
const { validateJWT } = require("../middlewares/jwt-validator");
const { isDate } = require("../helpers/isDate");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const router = Router();

//Aplica el middleware a todas las rutas
router.use(validateJWT);

//Obtener eventos
router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "start is not valid").custom(isDate),
    check("end", "end is not valid").custom(isDate),
    fieldsValidators,
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
