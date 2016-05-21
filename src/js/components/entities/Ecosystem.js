const React = require('react');
const Utils = require('../Utils');

/*
  This is our ecosystem.
  It will handle
 */

class Ecosystem extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      map: null,
      age: this.props.age
    };

  }

  componentDidMount() {

    /*
      Generate the map for this ecosystem
     */

    const map = Utils.generateMap(this.props.n, this.props.m);

    this.setState({
      map: map
    });

  }

  render() {

    const age = this.state.age;

    setTimeout(() => {
      this.setState({
        age: age + 1
      })
    }, 4000);

    let rendered = null;

    if (this.state.map) {

      rendered = this.state.map.map((row, index) => {

        const columns = row.map((item, index2) => {

          return (
            <div className='column' key={`ecosystem-row-${index}-${index2}`}>
              { item.render() }
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

    return (
      <div>
        <h4>Ecosystem (age: {age})</h4>

        { rendered }
      </div>
    );

  }

}

Ecosystem.defaultProps = {
  n: 50,
  m: 70,
  age: 0
};

module.exports = Ecosystem;
