const React = require('react');
const Utils = require('../Utils');

const config = Object.assign({}, Utils.getConfigForEntity('Bear'), {});

/*
  Entity: Bear
  They can walk 5 spaces each month
  They will select one adjacent tile that is adjancent to a tree
  If no such tile is available, they will move to a free one
 */
class Bear {

  constructor() {

    this.type = 'Bear';

    this.state = {
      age: 0,
      initialAge: 0
    };

  }

  onChangeAge(age) {

    let events = [];

    this.state.age = age;
    this.state.moves = Utils.random(0, config.maxMoves);

    for (let i = 0; i < config.maxMoves; i++) {

      events.push({
        type: 'move',
        direction: Utils.getMoveDirections()[Utils.random(0, 7)],
        entity: this
      });

    }

    return events;

  }

  onEncounterWithLumberjack(lumberjack) {

    /*
      On encounter with a lumberjack,
      75% chance to win => kill the lumberjack
      15% chance to die => bear will be killed,
      10% chance they both die
    */

    let events = [];

    if (Utils.hadChance(config.chanceToBothDie)) {

      events.push(
        { type: 'delete', entity: lumberjack },
        { type: 'delete', entity: this }
      );

    } else if (Utils.hadChance(config.chanceToLose)) {

      events.push({ type: 'delete', entity: this });

    } else if (Utils.hadChance(config.chanceToWin)) {

      events.push({ type: 'delete', entity: lumberjack });

    }

    return events;

  }

  render() {

    return (
      <div>
        <img src={'./images/bear.bmp'} />
      </div>
    );

  }

};

module.exports = Bear;
