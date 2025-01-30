const { Employee } = require("../models");

class Controller {
  static async getAllEmployees(req, res) {
    const employees = await Employee.findAll();
    // res.send(employees);
    res.render("home", { employees });
  }

  //! AYO JANGAN MALAS, KERJAKAN SATU SATU
  static async addEmployeeForm(req, res) {
    res.send(`add employee dipencet - buat formnya`);
  }

  static async addEmployee(req, res) {
    res.send(`add employee dipencet buat postnya`);
  }

  static async employeeDetail(req, res) {
    res.send(`employee detail dipencet`);
  }

  static async editEmployeeForm(req, res) {
    res.send(`edit employee dipencet buat formnya`);
  }

  static async editEmployee(req, res) {
    res.send(`edit employee dipencet buat postnya`);
  }

  static async deleteEmployee(req, res) {
    res.send(`delete employee dipencet`);
  }
}

module.exports = Controller;
