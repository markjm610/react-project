'use strict';
module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define('Column', {
    name: DataTypes.STRING,
    pageColumnId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  Column.associate = function (models) {
    Column.belongsTo(models.Project, { foreignKey: 'projectId' });
    Column.hasMany(models.Task, { foreignKey: 'columnId' })
  };
  return Column;
};