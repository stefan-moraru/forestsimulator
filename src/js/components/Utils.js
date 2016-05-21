const React = require('react');
const _ = require('lodash');

const getConfigForEntity = (entityType) => {

  const configs = {
    'Tree': {
      minAgeForTree: 12,
      minAgeForElder: 120,
      treeChanceToSpawnSapling: 10,
      elderChanceToSpawnSapling: 20,
      elderChanceToDie: 10
    },
    'Lumberjack': {
      lumber: 0,
      lumberFromTree: 1,
      lumberFromElder: 3,
      maxMoves: 3
    },
    'Bear': {
      maxMoves: 5,
      chanceToWin: 75,
      chanceToLose: 15,
      chanceToBothDie: 10
    },
    'Ecosystem': {
      ageSpeed: 300,
      ageMax: 500
    }
  };

  return configs[entityType];

};

const getMoveDirections = () => {

  return [
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },

    { x: -1, y: 0 },
    { x: 1, y: 0 },

    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 }
  ];

};

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

  const entities = getEntities();

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

      if (entity.state && e.init) {
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

      pool[ind].entity.position = { x: i, y: j };

      tiles[i][j] = pool[ind].entity;

      ind++;
    }
  }

  return tiles;

};

const getNumberOfTreesFromMap = (map) => {

  let count = 0;

  map.forEach(row => {
    row.forEach(item => {
      if (item.type === 'Tree') {
        count++;
      }
    })
  });

  return count;

};

const Utils = {
  generateMap: generateMap,
  hadChance: hadChance,
  random: _.random,
  getEntities: getEntities,
  getMoveDirections: getMoveDirections,
  getConfigForEntity: getConfigForEntity,
  getNumberOfTreesFromMap: getNumberOfTreesFromMap
};

module.exports = Utils;
