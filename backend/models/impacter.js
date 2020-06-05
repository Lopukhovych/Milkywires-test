'use strict';
module.exports = (sequelize, DataTypes) => {
  const Impacter = sequelize.define('Impacter', {
    title: DataTypes.STRING
  }, {});
  Impacter.associate = function(models) {
    Impacter.hasMany(models.Post, {
      foreignKey: 'impacterId',
      as: 'posts',
      onDelete: 'CASCADE',
    });
  };
  return Impacter;
};