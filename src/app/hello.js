module.exports = {
  template: require('./hello.html'),
  controller: function () {
    this.hello = 'Hi';
    this.goAhead = function () {
      this.hello = 'BYE';
    };
  }
};
