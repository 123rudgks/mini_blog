module.exports = (sequelize, DataTypes) => {
  const PostModel = sequelize.define("PostModel", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    context: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  PostModel.associate = (models) => {
    PostModel.hasMany(models.CommentModel, {
      onDelete: "cascade",
    });
  };

  return PostModel;
};
