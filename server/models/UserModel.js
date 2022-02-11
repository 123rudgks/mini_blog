module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define("UserModel", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return UserModel;
};
