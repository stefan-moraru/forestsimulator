const React = require('react');
const Utils = require('../Utils');

const getTreeType = (age) => {

  let treeType = '';

  if (age < 12) {
    treeType = 'sapling'
  } else if (age >= 12 && age < 120) {
    treeType = 'tree';
  } else if (age >= 120) {
    treeType = 'elder';
  }

  return treeType;

};

module.exports = function() {

  this.type = 'Tree';

  this.state = {
    age: 0,
    initialAge: 0,
    dead: false,
    treeType: 'sapling'
  };

  this.init = (state) => {

    this.state.age = state.age;
    this.state.treeType = getTreeType(state.age);

  };

  this.onChangeAge = (age) => {

    this.state.age = age;

    let events = [];

    // Tree type
    this.state.treeType = getTreeType(age);

    // A tree has a 10% chance every month to randomly create a new Sapling
    // TODO: Change back to 10
    if (this.state.treeType === 'tree' && Utils.hadChance(100)) {

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

      if (Utils.hadChance(20)) {

        events.push({
          type: 'create',
          entity: 'Tree',
          state: {
            age: 0
          }
        });

      } else if (Utils.hadChance(10) && (this.state.age - this.state.initialAge) % 12 === 0) {

        this.state.dead = true;

        events.push({
          type: 'delete',
          entity: this
        });

      }

    }

    // Return the created array of events
    return events;

  };

  this.render = () => {

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

  };

}
