/*
    Rutas de Eventos
    host + /api/events
*/

const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const {isDate} = require('../helpers/isDate');
const {actualizarEvento, crearEvento, getEventos, eliminarEvento} = require('../controllers/events');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

// Todas tienen que pasar por la validación del JWT
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// Actualizar evento
router.put(
    '/:id', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento
);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;