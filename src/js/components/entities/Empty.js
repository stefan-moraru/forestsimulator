const React = require('react');
const Utils = require('../Utils');

const config = {
  canBeOverwritten: true
};

/*
  Entity: Empty tile
 */
class Empty {

  constructor() {

    this.type = 'Empty';

    this.canBeOverwritten = config.canBeOverwritten;

  }

  render() {

    return (
      <div>
        <img src={'./images/grass.bmp'} />
      </div>
    );

  }

}

module.exports = Empty;
