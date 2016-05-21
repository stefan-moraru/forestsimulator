const React = require('react');
const Utils = require('../Utils');
const LineChart = require("react-chartjs").Line;

/*
  This is our ecosystem.
  It will handle interactions between entities
 */

class Ecosystem extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      map: null,
      age: this.props.age,
      ageSpeed: this.props.ageSpeed
    };

  }

  generateMap() {

    const percentages = this.props.entitiesPercentage.map(item => {

      item.state = {
        age: this.props.age
      };

      return item;

    });

    const map = Utils.generateMap(this.props.n, this.props.m, percentages);

    this.setState({
      map: map
    });

    this.interval = null;

  }

  setAgeInterval() {

    this.interval = setInterval(() => {

      this.progressAge(this.state.age + 1);

    }, this.state.ageSpeed);

  }

  clearAgeInterval() {

    if (this.interval) {
      window.clearInterval(this.interval);
    }

  }

  componentDidMount() {

    this.generateMap();

    this.setAgeInterval();

    this.setState({
      data: { labels: [], datasets: [ Object.assign({}, { data: [] }) ] }
    });

  }

  progressAge(age) {

    /*
      Goes through the map and increments the age
      It will also handle events
      Big function, will handle all logic => TODO refactoring
    */

    if (age > this.props.ageMax) {
      return false;
    }

    const map = this.state.map;

    // TODO
    const n = 3;
    const m = 3;
    const entities = Utils.getEntities();

    // Event handler
    const handleEvents = (events, indexRow, indexColumn, item) => {

      events.forEach(event => {
        //console.log('Captured event');
        //console.log(event);

        if (!event.type) {

          return false;

        }

        // Delete entity
        if (event.type === 'delete') {

          map[event.entity.position.x][event.entity.position.y] = new entities['Empty'];

        }

        // Move entity
        if (event.type === 'move') {

          const x = indexRow + event.direction.x;
          const y = indexColumn + event.direction.y;

          // function: positionIsSafe
          if (x >= 0 && y >= 0 && x < m && y < n) {

            // Get entity from the new position
            const nextEntity = map[x][y];

            if (nextEntity.type === 'Empty') {

              map[event.entity.position.x][event.entity.position.y] = new entities['Empty'];

              map[x][y] = event.entity;

              event.entity.position = {
                x: x,
                y: y
              };

            } else {

              // Encounter
              // Current entity = item
              const eventTypeA = `onEncounterWith${nextEntity.type}`;
              const eventTypeB = `onEncounterWith${item.type}`;

              if (item[eventTypeA]) {
                handleEvents(item[eventTypeA](nextEntity), indexRow, indexColumn, item);
              }

              if (nextEntity[eventTypeB]) {
                handleEvents(nextEntity[eventTypeB](item), indexRow, indexColumn, nextEntity);
              }

            }

          }

        }

        // Create new entity with state
        if (event.type === 'create') {

          const entity = new entities[event.entity];

          entity.init(event.state);

          // Check neighbours
          // [indexRow, indexColumn]
          const directions = Utils.getMoveDirections();

          let added = false;

          directions.forEach(direction => {

            const x = indexRow + direction.x;
            const y = indexColumn + direction.y;

            if (x >= 0 && y >= 0 && x < m && y < n) {

              if (added === false && map[x][y] && map[x][y].canBeOverwritten === true) {

                added = true;

                entity.position = { x: x, y: y };

                map[x][y] = entity;
              }

            }
          });


        }

      });

    };

    map.forEach((row, indexRow) => {

      row.forEach((item, indexColumn) => {

        /*
          Progress item
          No state => Empty tile
        */

        if (item.state && item.onChangeAge) {

          handleEvents(item.onChangeAge(item.state.age + 1), indexRow, indexColumn, item);

        }

      });

    });

    let stateData = this.state.data.datasets[0].data;

    if (stateData.length > 10) {
      stateData = stateData.slice(10);
    }

    this.setState({
      age: age,
      data: { labels: [], datasets: [ Object.assign({}, { data: [ ...stateData, Utils.getNumberOfTreesFromMap(map) ] }) ] }
    });

  }

  generateForest(map) {

    return map.map((row, index) => {

      const columns = row.map((item, index2) => {

        return (
          <div className='column' key={`ecosystem-row-${index}-${index2}`}>
            <div className='entity'>
              { item.render() }
            </div>
          </div>
        );

      });

      return (
        <div className='row' key={`ecosystem-row-${index}`}>
          { columns }

          <div className='clearfix'></div>
        </div>
      );

    });

  }

  hideChart() {

    this.setState({
      showChart: false
    });

  }

  showChart() {

    this.setState({
      showChart: true
    });

  }

  updateAgeSpeed(event) {

    this.clearAgeInterval();

    this.setState({
      ageSpeed: event.target.value
    }, () => {
      this.setAgeInterval();
    });

  }

  render() {

    var LineChart = require("react-chartjs").Line;

    const age = this.state.age;

    let forest = null;
    let stats = null;

    if (this.state.map) {

      forest = this.generateForest(this.state.map);

    }

    if (this.state.age >= this.props.ageMax) {

      stats = <h5>Finished simulation for this ecosystem</h5>;

    }

    let chart = null;

    if (this.state.data && this.state.showChart) {
      chart = (
        <div>
          <LineChart data={this.state.data} options={{ responsive: true }} width="600" height="250"/>
          <button type='button' onClick={this.hideChart.bind(this)}>Hide chart</button>
        </div>
      );
    } else {
      chart = <button type='button' onClick={this.showChart.bind(this)}>Show Tree chart</button>
    }

    let title = 'Ecosystem';

    if (this.props.title) {
      title += `: ${this.props.title}`;
    }

    return (
      <div className='ecosystem'>
        <div className='mb'>
          <h1>{ title } <span className='small'>(age: {age})</span></h1>
          <h3>One month is { this.state.ageSpeed } milliseconds</h3>
          { stats }
        </div>

        <div className='forest mb'>
          { forest }
        </div>

        <div className='slider'>
          <input type='range' value={this.state.ageSpeed} min={100} max={10000} step={100} onChange={this.updateAgeSpeed.bind(this)} />
        </div>

        <div className='chart'>
          { chart }
        </div>
      </div>
    );
          //{ forest }

  }

}

Ecosystem.defaultProps = Object.assign({}, Utils.getConfigForEntity('Ecosystem'), {
  n: 10,
  m: 10,
  age: 0,
});

module.exports = Ecosystem;
