const React = require('react');
const _ = require('lodash');

const getEntities = () => {

    return {
      'Empty': require('./entities/Empty'),
      'Tree': require('./entities/Tree'),
      'Lumberjack': require('./entities/Lumberjack'),
      'Bear': require('./entities/Bear')
    };

};

const hadChance = (chance = 10) => { // Default: 10 percent chance

  const random = Math.random();

  chance = chance / 100;

  if (random < chance) {

    return true;

  }

  return false;

};

/*
  generateMap(10, 10,
    [
      { entity: 'Tree', percentage: 35, state: { age: 12 }},
      { entity: 'Tree', percentage: 10, state: { age: 0 }},
      { entity: 'Elder', percentage: 5, state: { age: 120 }},
      { entity: 'Lumberjack', percentage: 10 },
      { entity: 'Bear', percentage: 4 }
    ]
  )
 */
const generateMap = (n = 50, m = 70, entitiesPercentage = []) => {

  // Playground
  //
  const entities = getEntities();
  /*

  const tree = new entities['tree'];

  console.log(tree.onChangeAge(15));


  tiles[0][0] = new entities['tree'];
  tiles[0][1] = new entities['lumberjack'];
  tiles[0][2] = new entities['bear'];
  tiles[1][0] = new entities['empty'];
  tiles[1][1] = new entities['empty'];
  tiles[1][2] = new entities['empty'];

  return tiles; */

  const tileCount = n * m;

  let tiles = [];

  let i;

  for (i = 0; i < n; i++) {
    tiles[i] = [];
  }

  let pool = [];

  entitiesPercentage.forEach(entity => {

    for (let i = 0; i < entity.percentage; i++) {

      const e = new entities[entity.entity];

      if (entity.state) {
        e.init(entity.state);
      }

      pool.push({
        entity: e
      });

    }

  });

  const total = pool.length;

  if (total > tileCount) {
    pool = pool.splice(0, tileCount);
  } else if (total < tileCount) {
    for (let i = 0; i < (tileCount - total); i++) {
      pool.push({
        entity: new entities['Empty']
      });
    }
  }

  let ind = 0;

  pool = _.shuffle(pool);

  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      tiles[i][j] = pool[ind].entity;

      ind++;
    }
  }

  return tiles;

};

const Utils = {
  generateMap: generateMap,
  hadChance: hadChance,
  random: _.random,
  getEntities: getEntities
};

module.exports = Utils;
