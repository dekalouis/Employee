"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async filterData(name, age) {
      const options = {};
      if (name || age) {
        options.where = {};
        if (age) {
          options.where.age = age;
        }
        if (name) {
          options.where.name = {
            [Op.iLike]: `%${name}%`,
          };
        }
      }
      const employees = await Employee.findAll(options);
      return employees;
    }

    //!yang static data
    static async employeeData() {
      const result = await Employee.findAll({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("id")), "total"],
          [sequelize.fn("MIN", sequelize.col("age")), "youngest"],
          [sequelize.fn("MAX", sequelize.col("age")), "oldest"],
        ],
      });

      // console.log(`-- gas`, result);
      // console.log(result[0].dataValues, `harusnya ini`);
      const { total, youngest, oldest } = result[0].dataValues;

      return {
        total,
        youngest,
        oldest,
      };
    }
  }
  Employee.init(
    {
      name: DataTypes.STRING,
      position: DataTypes.STRING,
      education: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
