const express = require('express');
const personController = require('../controllers/personController');

const router = express.Router();

router.get('/persons', personController.index);
router.get('/add', personController.add);
router.post('/add', personController.store);
router.post('/persons/delete', personController.destroy);
router.get('/persons/edit/:id', personController.edit);
router.post('/persons/edit/:id', personController.update);

module.exports = router;