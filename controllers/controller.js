const { Employee } = require("../models");
// const { Op, where } = require("sequelize");

class Controller {
  static async getAllEmployees(req, res) {
    try {
      // const employees = await Employee.findAll();
      // res.send(employees);
      const { name = "", age = "" } = req.query;

      const employeeData = await Employee.employeeData();
      console.log(employeeData);
      // console.log(name, `--ini ya--`, age);
      const employees = await Employee.filterData(name, age);

      // res.render("home", { employees });
      res.render("home", { employees, employeeData, name, age });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  //! ADD EMP
  static async addEmployeeForm(req, res) {
    // res.send(`add employee dipencet - buat formnya`);
    try {
      const degrees = ["Bachelor Degree", "Master Degree"];
      res.render("addEmployee", { degrees });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addEmployee(req, res) {
    // res.send(`add employee dipencet buat postnya`);
    try {
      const {
        name,
        position,
        education,
        email,
        phone_number,
        profile_picture,
        age,
      } = req.body;
      const newEmployee = await Employee.create({
        name,
        position,
        education,
        email,
        phone_number,
        profile_picture,
        age,
      });

      // console.log(newEmployee, `------ INIWOI`);
      // console.log(newEmployee.id);
      // res.redirect(`/employees/${newEmployee.id}`);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  //! EMPLOYE DETAILNYA
  static async employeeDetail(req, res) {
    // res.send(`employee detail dipencet`);
    try {
      const { id } = req.params;
      // console.log(id, `------`, req.params, "INI YAA");
      const employee = await Employee.findByPk(id);
      // const employee = await Employee.findOne({
      //   where: {
      //     id,
      //   },
      // });

      // res.send(employee);
      res.render("employeeDetail", { employee });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  //! EDITINGNYA INI
  static async editEmployeeForm(req, res) {
    // res.send(`edit employee dipencet buat formnya`);
    try {
      const { id } = req.params;
      const employee = await Employee.findByPk(id);

      const degrees = ["Bachelor Degree", "Master Degree"];

      res.render("editEmployee", { employee, degrees });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async editEmployee(req, res) {
    // res.send(`edit employee dipencet buat postnya`);
    const { id } = req.params;
    const {
      name,
      position,
      education,
      email,
      phone_number,
      profile_picture,
      age,
    } = req.body;

    await Employee.update(
      {
        name,
        position,
        education,
        email,
        phone_number,
        profile_picture,
        age,
      },
      {
        where: {
          id,
        },
      }
    );
    res.redirect(`/employees/${id}`);
  }

  //!DELETENYA INI
  static async deleteEmployee(req, res) {
    // res.send(`delete employee dipencet`);
    try {
      const { id } = req.params;
      const employeeToDelete = await Employee.findByPk(id);

      await employeeToDelete.destroy();
      // console.log(employeeToDelete);

      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
