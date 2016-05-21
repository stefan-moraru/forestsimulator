const React = require('react');
const Utils = require('../Utils');

const config = Object.assign({}, Utils.getConfigForEntity('Tree'), {});

const getTreeType = (age) => {

  let treeType = '';

  if (age < config.minAgeForTree) {
    treeType = 'sapling'
  } else if (age >= config.minAgeForTree && age < config.minAgeForElder) {
    treeType = 'tree';
  } else if (age >= config.minAgeForElder) {
    treeType = 'elder';
  }

  return treeType;

};

class Tree {

  constructor() {

    this.type = 'Tree';

    this.state = {
      age: 0,
      initialAge: 0,
      treeType: 'sapling'
    };

  }

  init(state) {

    this.state.age = state.age;
    this.state.treeType = getTreeType(state.age);

  }

  onChangeAge(age) {

    this.state.age = age;

    let events = [];

    // Tree type
    this.state.treeType = getTreeType(age);

    // A tree has a 10% chance every month to randomly create a new Sapling
    if (this.state.treeType === 'tree' && Utils.hadChance(config.treeChanceToSpawnSapling)) {

      events.push({
        type: 'create',
        entity: 'Tree',
        state: {
          age: 0
        }
      });

    }

    // An elder tree has
    // 20% chance every month to spawn a new sapling
    // 10% chance every year to die
    if (this.state.treeType === 'elder') {

      if (Utils.hadChance(config.elderChanceToSpawnSapling)) {

        events.push({
          type: 'create',
          entity: 'Tree',
          state: {
            age: 0
          }
        });

      } else if (Utils.hadChance(config.elderChanceToDie) && (this.state.age - this.state.initialAge) % 12 === 0) {

        events.push({
          type: 'delete',
          entity: this
        });

      }

    }

    // Return the created array of events
    return events;

  }

  render() {

    let image = 'tree_small.bmp';

    if (this.state.treeType === 'sapling') {
      image = 'tree_small.bmp';
    } else if (this.state.treeType === 'tree') {
      image = 'tree_medium.bmp';
    } else if (this.state.treeType === 'elder') {
      image = 'tree_big.bmp';
    }

    return (
      <div>
        <img src={`./images/${image}`} />
      </div>
    );

  }
}

module.exports = Tree;
