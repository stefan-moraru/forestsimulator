const React = require('react');
const Utils = require('./Utils');
const Ecosystem = require('./entities/Ecosystem');

/*
  This class will handle the update method, which will update the props
 */
class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      configuredEcosystem: null
    };

  }

  updateConfig(event) {

    this.setState({
      configuredEcosystem: event.target.value
    });

  }

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

    let ecosystemsConfigs = [
      { title: 'Single Lumberjack', n: 3, m: 3, entitiesPercentage: entitiesPercentage1, ageSpeed: 2000, age: 12 },
      { title: 'Single tree', n: '3', m: '3', entitiesPercentage: entitiesPercentage2 },
      { title: 'Dynamic', n: '10', m: '10', entitiesPercentage: entitiesPercentage3, ageSpeed: 100 },
      { title: 'Bear and Lumberjack', n: '3', m: '3', entitiesPercentage: entitiesPercentage4, ageSpeed: 2000, age: 12, ageMax: 14 },
      //{ title: 'Dynamic', n: '30', m: '30', entitiesPercentage: entitiesPercentage3, ageSpeed: 100 }
    ];

    if (this.state.configuredEcosystem) {
      let config = null;

      try {
        config = JSON.parse(this.state.configuredEcosystem);
      } catch(e) {
      }

      if (config && config.entitiesPercentage) {
        ecosystemsConfigs.push(config);
      }
    }

    const ecosystems = ecosystemsConfigs.map((ecosystem, index) => {

      const props = Object.assign({}, {
        id: index,
      }, ecosystem);

      return <Ecosystem {...props} />;

    });

    const style = {
      'backgroundImage': `url('./images/print.png')`
    };

    return (
      <div>
        <div className='home-jumbotron' style={style}>
          <h1>Real-time forest simulator</h1>
        </div>

        { ecosystems }

        <div className='ecosystem'>
          <h1>Create your own forest</h1>
          <h3>Configure anything about your new environment</h3>
          <textarea onChange={this.updateConfig.bind(this)}></textarea>
        </div>

      </div>
    );

  }

}

module.exports = App;
