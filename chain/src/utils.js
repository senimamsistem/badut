function getRandomAmount(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  module.exports = { getRandomAmount };
  