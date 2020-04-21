'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Trainer extends Model {}

  Trainer.init({
    name: DataTypes.STRING,
    smallPokemon: DataTypes.INTEGER,
    bigPokemon: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (trainer) => {
        return new Promise((resolve, reject) => {
          setTimeout(function() {
            trainer.name = 'Hacktiv8 ' + trainer.name;
            resolve(trainer);
          }, 1000)
        })
      },
      afterCreate: (trainer) => {
        trainer.name += ' Cool';
      }
    },
    sequelize
  });

  Trainer.associate = function(models) {
    Trainer.hasMany(models.Pokemon);
  };

  return Trainer;
};