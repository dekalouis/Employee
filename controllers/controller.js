const { Employee } = require("../models");

class Controller {
  static async getAllEmployees(req, res) {
    const employees = await Employee.findAll();
    res.send(employees);
  }
}

module.exports = Controller;
