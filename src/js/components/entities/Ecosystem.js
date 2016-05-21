const React = require('react');
const Utils = require('../Utils');

/*
  This is our ecosystem.
  It will handle interactions between entities
 */

class Ecosystem extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      map: null,
      age: this.props.age
    };

  }

  generateMap() {

    const map = Utils.generateMap(this.props.n, this.props.m, this.props.entitiesPercentage);

    this.setState({
      map: map
    });

  }

  componentDidMount() {

    this.generateMap();

    setInterval(() => {

      this.progressAge(this.state.age + 1);

    }, this.props.ageSpeed);

  }

  play() {

  }

  progressAge(age) {

    /*
      Goes through the map and increments the age
      It will also handle events
      Big function, will handle all logic => TODO refactoring
    */

    const map = this.state.map;

    // TODO
    const n = 3;
    const m = 3;
    const entities = Utils.getEntities();

    map.forEach((row, indexRow) => {

      row.forEach((item, indexColumn) => {

        /* Progress item */

        // No state => Empty tile
        if (item.state) {

          if (item.onChangeAge) {

            item.onChangeAge(item.state.age + 1).forEach(event => {

              // Event handler
              console.log('Captured event');
              console.log(event);

              // Delete entity
              if (event.type === 'delete') {
                map[indexRow][indexColumn] = null;

                map[indexRow][indexColumn] = new entities['Empty'];
              }

              // Create new entity with state
              if (event.type === 'create') {

                const entity = new entities[event.entity];

                entity.init(event.state);

                // Check neighbours
                // [indexRow, indexColumn]
                const directions = [
                  { x: -1, y: 1 },
                  { x: 0, y: 1 },
                  { x: 1, y: 1 },

                  { x: -1, y: 0 },
                  { x: 0, y: 0 },
                  { x: 1, y: 0 },

                  { x: -1, y: -1 },
                  { x: 0, y: -1 },
                  { x: 1, y: -1 }
                ];

                let added = false;

                directions.forEach(direction => {

                  const x = indexRow + direction.x;
                  const y = indexColumn + direction.y;

                  if (x >= 0 && y >= 0 && x < m && y < n) {

                  if (added === false && map[x][y] && map[x][y].canBeOverwritten === true) {

                    added = true;

                    map[x][y] = entity;
                  }

                  }
                });


              }

            });

          }

        }

      });

    });

    this.setState({
      age: age
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

  render() {

    const age = this.state.age;

    let forest = null;

    if (this.state.map) {

      forest = this.generateForest(this.state.map);

    }

    return (
      <div className='ecosystem'>
        <h4>Ecosystem (age: {age})</h4>
        <h5>One month is { this.props.ageSpeed } milliseconds</h5>

        <div className='forest'>
          { forest }
        </div>
      </div>
    );

  }

}

Ecosystem.defaultProps = {
  n: 50,
  m: 70,
  age: 0,
  ageSpeed: 300
};

module.exports = Ecosystem;
