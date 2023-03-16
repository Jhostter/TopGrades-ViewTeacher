const express = require('express');
const studentsController = require('../controllers/studentsController');

const router = express.Router();

router.get('/students', studentsController.index);
router.post('/students/search', studentsController.studentsSearch)
router.get('/add', studentsController.add);
router.post('/add', studentsController.store);
router.post('/students/delete', studentsController.destroy);
router.get('/students/edit/:id', studentsController.edit);
router.post('/students/edit/:id', studentsController.update);

module.exports = router;