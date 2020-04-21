const AllModel = require('./models/index.js');

const Pokemon = AllModel.Pokemon;
const Trainer = AllModel.Trainer;

class Controller {
  static createTrainer() {
    const trainer = {
      name: 'mei',
      smallPokemon: 0,
      bigPokemon: 0
    }

    Trainer
      .create(trainer)
      .then(trainer => {
        console.log(trainer.dataValues);
      })
      .catch(error => {
        console.log(error)
      })
  }

  static destroy() {
    Trainer
      .destroy({
        where: {
          id: 1
        }
      })
      .then(deleteCount => {
        console.log(deleteCount)
      })
      .catch(err => {
        console.log(err);
      })
  }

  static update() {
    Pokemon
      .update({
        size: 'small'
      }, {
        where: {
          id: 1
        },
        returning: true,
        individualHooks: true
      })
      .then(updated => {
        console.log(updated[1][0].dataValues)
      })
      .catch(error => {
        console.log(error);
      })
  }
}

Controller.update();