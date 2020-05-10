'use strict';
module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define('Column', {
    name: DataTypes.STRING,
    pageColumnId: DataTypes.INTEGER
  }, {});
  Column.associate = function(models) {
    // associations can be defined here
  };
  return Column;
};