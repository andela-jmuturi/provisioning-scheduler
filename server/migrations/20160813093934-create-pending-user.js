/* eslint-disable new-cap */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('pending_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      isPending: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      verificationToken: {
        type: Sequelize.STRING(36)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('pending_users')
};
