'use strict';
/** @type {import('sequelize-cli').Migration} */

const { USER_ROLES_ENUMS } = require("../utils/common/enums");
const { FLIGHT_COMPANY, CUSTOMER, ADMIN } = USER_ROLES_ENUMS;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM({
          values: [ADMIN, FLIGHT_COMPANY, CUSTOMER]
        }),
        defaultValue: CUSTOMER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};