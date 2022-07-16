module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      }
    });
    return Users;
  };