const React = require('react');
const Utils = require('./Utils');
const Ecosystem = require('./entities/Ecosystem');

/*
  This class will handle the update method, which will update the props
 */
class App extends React.Component {

  render() {

    return (
      <div>
        <h4>This is our first ecoystem</h4>

        <Ecosystem n='10' m='10' />
      </div>
    );

  }

}

module.exports = App;
