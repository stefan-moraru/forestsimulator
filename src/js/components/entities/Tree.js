const React = require('react');
const Utils = require('../Utils');

module.exports = function() {

  this.type = 'Tree';

  this.state = {
    age: 0,
    initialAge: 0,
    dead: false,
    treeType: 'sapling'
  };

  this.onChangeAge = (age) => {

    this.state.age = age;

    let events = [];

    // Tree type
    if (age < 12) {
      this.state.treeType = 'sapling'
    } else if (age >= 12 && age < 120) {
      this.state.treeType = 'tree';
    } else if (age >= 120) {
      this.state.treeType = 'elder';
    }

    // A tree has a 10% chance every month to randomly create a new Sapling
    if (this.state.treeType === 'tree' && Utils.hadChance(10)) {

      events.push({
        type: 'create',
        entity: 'tree',
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
          entity: 'tree',
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

    return (
      <div>
        TREE
      </div>
    );

  };

}
