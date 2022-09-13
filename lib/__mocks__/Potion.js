// Mocks are created when functions have interdependency, so that the new function you're testing 
// doesn't get interfered with by the included function

module.exports = function() {
    this.name = 'health';
    this.value = 20;
};