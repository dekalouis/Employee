const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.getAllEmployees);

//! KERJAIN DULU YAAAA
router.get("/employees/add", Controller.addEmployeeForm);

router.post("/employees/add", Controller.addEmployee);

router.get("/employees/:id", Controller.employeeDetail);

router.get("/employees/:id/edit", Controller.editEmployeeForm);

router.post("/employees/:id/edit", Controller.editEmployee);

router.get("/employees/:id/delete", Controller.deleteEmployee);

module.exports = router;
