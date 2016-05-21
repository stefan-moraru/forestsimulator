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

    map.forEach(row => {

      row.forEach(item => {

        /* Progress item */

        // No state => Empty tile
        if (item.state) {

          if (item.onChangeAge) {

            item.onChangeAge(item.state.age + 1); // TODO

            item.onChangeAge(item.state.age + 1).forEach(event => {

              // Event handler

              console.log('Captured event');
              console.log(event);

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
  ageSpeed: 3000
};

module.exports = Ecosystem;
