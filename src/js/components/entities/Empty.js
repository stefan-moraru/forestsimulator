const React = require('react');
const Utils = require('../Utils');

const config = {
};

/*
  Entity: Empty tile
 */
module.exports = function() {

  this.type = 'Empty';

  this.canBeOverwritten = true;

  this.render = () => {

    return (
      <div>
        <img src={'./images/grass.bmp'} />
      </div>
    );

  }

};
