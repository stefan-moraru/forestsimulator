const React = require('react');
const Utils = require('../Utils');

class NewEntity {

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

    return events;

  }

  render() {

    return (
      <div>
        { this.state.age }
      </div>
    );

  }

};

module.exports = NewEntity;
