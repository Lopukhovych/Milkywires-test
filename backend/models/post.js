'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    imagePath: DataTypes.STRING,
    impacterId: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Impacter, {
      foreignKey: 'impacterId',
      as: 'impacter',
      onDelete: 'CASCADE',
    });
  };
  return Post;
};
