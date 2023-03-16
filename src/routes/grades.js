const express = require("express");
const gradeController = require("../controllers/gradesController");

const router = express.Router();

router.get("/viewGrades", gradeController.index);
router.post("/grades/search", gradeController.searchGrades);
router.get("/addGrade", gradeController.add);
router.post("/studentsG/search", gradeController.filterGrades);
router.post("/addGrade", gradeController.store);
router.post("/grades/delete", gradeController.destroy);
router.get("/grades/edit/:id", gradeController.edit);
router.post("/grades/edit/:id", gradeController.update);

module.exports = router;
