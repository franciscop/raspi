const gpio = require('./gpio');

module.exports = (a, b) => ({
  forward: async () => {
    await gpio(a).on();
    await gpio(b).off();
  }
});
