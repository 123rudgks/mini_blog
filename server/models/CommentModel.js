module.exports = (sequelize, DataTypes)=>{
  const CommentModel = sequelize.define("CommentModel", {
    context:{
      type: DataTypes.STRING,
      allowNull: false
    },
    username:{
      type:DataTypes.STRING,
      allowNull: false
    }
  });

  return CommentModel
}