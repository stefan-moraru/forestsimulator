const React = require('react');
const Utils = require('./Utils');
const Ecosystem = require('./entities/Ecosystem');

/*
  This class will handle the update method, which will update the props
 */
class App extends React.Component {

  render() {

    const entities = Utils.getEntities();

    const entitiesPercentage = [
      { entity: 'Tree', percentage: 35, state: { age: 12 }},
      { entity: 'Tree', percentage: 10, state: { age: 0 }},
      { entity: 'Tree', percentage: 5, state: { age: 120 }},
      { entity: 'Lumberjack', percentage: 10 },
      { entity: 'Bear', percentage: 4 }
    ];

    const entitiesPercentage1 = [
      { entity: 'Tree', percentage: 1, state: { age: 120 } }
    ];

    const ecosystems = [
      <Ecosystem id='1' n='3' m='3' entitiesPercentage={entitiesPercentage1} />//,
      //<Ecosystem id='2' n='10' m='10' entitiesPercentage={entitiesPercentage} ageSpeed={10} />
    ];

    return (
      <div>
        { ecosystems }
      </div>
    );

  }

}

module.exports = App;
