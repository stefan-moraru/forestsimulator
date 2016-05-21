const React = require('react');
const Utils = require('../Utils');

const config = {
  maxMoves: 5
};

/*
  Entity: Bear
  They can walk 5 spaces each month
  They will select one adjacent tile that is adjancent to a tree
  If no such tile is available, they will move to a free one
  On encounter with a lumberjack,
    75% chance to win => kill the lumberjack
    15% chance to die => bear will be killed,
    10% chance they both die
    Lumberjack and Bear turn ends
 */
module.exports = function() {

  this.type = 'Bear';

  this.state = {
    age: 0,
    initialAge: 0
  };

  this.onChangeAge = (age) => {

    let events = [];

    this.state.age = age;
    this.state.moves = Utils.random(0, config.maxMoves);

    for (let i = 0; i < config.maxMoves; i++) {

      events.push({
        type: 'move',
        direction: Utils.random(0, 7)
      });

    }

    return events;

  };

  this.onEncounterWithLumberjack = (lumberjack) => {

  };

  this.render = () => {

    return (
      <div>
        <img src={'./images/bear.bmp'} />
      </div>
    );

  }

};
