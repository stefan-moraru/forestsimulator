const React = require('react');
const Utils = require('./Utils');
const Ecosystem = require('./entities/Ecosystem');

/*
  This class will handle the update method, which will update the props
 */
class App extends React.Component {

  render() {

    const entities = Utils.getEntities();

    const entitiesPercentage1 = [
      { entity: 'Lumberjack', percentage: 1 }
    ];

    const entitiesPercentage2 = [
      { entity: 'Tree', percentage: 1, state: { age: 120 } }
    ];

    const entitiesPercentage3 = [
      { entity: 'Tree', percentage: 35, state: { age: 12 }},
      { entity: 'Tree', percentage: 10, state: { age: 0 }},
      { entity: 'Tree', percentage: 5, state: { age: 120 }},
      { entity: 'Lumberjack', percentage: 10 },
      { entity: 'Bear', percentage: 4 }
    ];

    const entitiesPercentage4 = [
      { entity: 'Bear', percentage: 1 },
      { entity: 'Lumberjack', percentage: 1 }
    ];

    const ecosystemsConfigs = [
      { n: 3, m: 3, entitiesPercentage: entitiesPercentage1, ageSpeed: 2000, age: 12 },
      { n: '3', m: '3', entitiesPercentage: entitiesPercentage2 },
      { n: '10', m: '10', entitiesPercentage: entitiesPercentage3, ageSpeed: 100 },
      { n: '3', m: '3', entitiesPercentage: entitiesPercentage4, ageSpeed: 2000, age: 12, ageMax: 14 }
    ];

    const ecosystems = ecosystemsConfigs.map((ecosystem, index) => {

      const props = Object.assign({}, {
        id: index,
      }, ecosystem);

      return <Ecosystem {...props} />;

    });

    return (
      <div>
        { ecosystems }
      </div>
    );

  }

}

module.exports = App;
