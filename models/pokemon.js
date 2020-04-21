'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Pokemon extends Model {}

  Pokemon.init({
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    TrainerId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeUpdate: (pokemon) => {
        const models = sequelize.models;
        console.log(pokemon._previousDataValues)
        if (pokemon._previousDataValues.size !== pokemon.size) {
          return models.Trainer
            .findByPk(pokemon.TrainerId)
            .then(trainer => {
              console.log(pokemon)
              if (pokemon.size === 'small') {
                trainer.bigPokemon -= 1;
                trainer.smallPokemon += 1;
              } else {
                trainer.bigPokemon += 1;
                trainer.smallPokemon -= 1;
              }

              return models.Trainer
                .update({
                  bigPokemon: trainer.bigPokemon,
                  smallPokemon: trainer.smallPokemon
                }, {
                  where: {
                    id: trainer.id
                  }
                })
            })
        }
      }
    },
    sequelize
  });

  Pokemon.associate = function(models) {
    Pokemon.belongsTo(models.Trainer);
  };

  return Pokemon;
};