
const motor = (a, b) => ({
  forward: () => {
    await gpio(a).on();
    await gpio(b).off();
  }
});
