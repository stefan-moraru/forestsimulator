const React = require('react');
const Utils = require('../Utils');

const config = {
  lumber: 0,
  lumberFromTree: 1,
  lumberFromElder: 3,
  maxMoves: 3
};

class Lumberjack {

  constructor() {

    this.type = 'Lumberjack';

    this.state = {
      age: 0,
      initialAge: 0,
      lumber: config.lumber,
      dead: false,
      moves: 0
    };

  }

  onChangeAge(age) {

    let events = [];

    this.state.age = age;
    this.state.moves = Utils.random(0, config.maxMoves);

    // Send move event
    // 8 neighbours
    // 0 1 2
    // 3 x 4
    // 5 6 7
    for (let i = 0; i < config.maxMoves; i++) {

      events.push({
        type: 'move',
        direction: Utils.getMoveDirections()[Utils.random(0, 7)],
        entity: this
      });

    }

    return events;

  }

  onEncounterWithTree(tree) {

    let events = [];

    if (tree.state.treeType !== 'sapling') {

      if (tree.state.treeType === 'tree') {
        this.state.lumber += config.lumberFromTree;
      }

      if (tree.state.treeType === 'elder') {
        this.state.lumber += config.lumberFromElder;
      }

      events.push({
        type: 'delete',
        entity: tree
      });

      events.push({
        type: 'move',
        direction: { x: tree.position.x, y: tree.position.y },
        entity: this
      });

    }

    return events;

  }

  render() {

    return (
      <div>
        <img src={'./images/leprechaun.bmp'} />
      </div>
    );

  }

};

module.exports = Lumberjack;
