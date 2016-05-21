const React = require('react');
const Utils = require('../Utils');
const _ = require('lodash');

const config = {
  lumber: 0,
  maxMoves: 3
};

module.exports = function() {

  this.type = 'Lumberjack';

  this.state = {
    age: 0,
    initialAge: 0,
    lumber: config.lumber,
    dead: false,
    moves: 0
  };

  this.onChangeAge = (age) => {

    let events = [];

    this.state.age = age;
    this.state.moves = _.random(0, config.maxMoves);

    // Send move event
    // 8 neighbours
    // 0 1 2
    // 3 x 4
    // 5 6 7
    for (let i = 0; i < config.maxMoves; i++) {

      // TODO: Ignored by the parent
      events.push({
        type: 'move',
        direction: _.random(0, 7);
      });

    }

  };

  this.onEncounterTree = (tree) => {

    let events = [];

    if (tree.state.treeType !== 'sapling') {

      this.state.lumber += 1;

      events.push({
        type: 'delete',
        entity: tree
      });

    }

    return events;

  };

  this.render = () => {

    return (
      <div>
        Lumberjack
      </div>
    );

  };

};
