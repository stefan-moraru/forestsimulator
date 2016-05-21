const React = require('react');
const _ = require('lodash');

const hadChance = (chance = 10) => { // Default: 10 percent chance

  if (Math.floor(Math.random() * 100) <= chance / 10) {

    return true;

  }

  return false;

};

const generateMap = (
  n = 50, m = 70,
  lumberjacksPercentage = 10 / 100,
  treeSaplingsPercentage = 10 / 100,
  treeAdultPercentage = 35 / 100,
  treeElderPercentage = 5 / 100,
  bearsPercentage = 4 / 100
) => {

  // Playground
  const entities = {
    'lumberjack': require('./entities/Lumberjack'),
    'tree': require('./entities/Tree')
  };

  const tree = new entities['tree'];

  console.log(tree.onChangeAge(15));

  let tiles = [];

  let i;

  for (i = 0; i < n; i++) {
    tiles[i] = [];
  }

  tiles[0][0] = new entities['tree'];
  tiles[0][1] = new entities['lumberjack'];

  return tiles;


  /*

  const tileCount = n * m;

  let lumberjacks = lumberjacksPercentage * tileCount;
  let treeSaplings = treeSaplingsPercentage * tileCount;
  let treeAdult =  treeAdultPercentage * tileCount;
  let treeElder = treeElderPercentage * tileCount;
  let bears = bearsPercentage * tileCount;

  let total = lumberjacks + treeSaplings + treeAdult + treeElder + bears;

  if (total > tileCount) {
    total = tiles;
  } else if (total < tileCount) {
    treeSaplings += tileCount - total;
  }

  let pool = []

  for (i = 0; i < lumberjacks; i++) pool.push(<Lumberjack />);
  for (i = 0; i < treeSaplings; i++) pool.push(<Tree age='0' />);
  for (i = 0; i < treeAdult; i++) pool.push(<Tree age='12' />);
  for (i = 0; i < treeElder; i++) pool.push(<Tree age='120' />);
  for (i = 0; i < bears; i++) pool.push(<Bear />);

  let ind = 0;

  pool = shuffle(pool);

  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      tiles[i][j] = pool[ind];

      ind++;
    }
  }

  return tiles;
  */

};

const Utils = {
  generateMap: generateMap,
  hadChance: hadChance
};

module.exports = Utils;
