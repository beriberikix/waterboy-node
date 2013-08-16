var gpio = require('gpio'),
    request = require('request'),
    os = require('os'); 

var blueLED, blueCounter, redLED, redCounter;

var RED_LED_PIN = 17,
    BLUE_LED_PIN = 22,
    BLUE_UP_PIN = 27,
    RED_UP_PIN = 4,
    BASE_API_URL = 'http://192.241.227.103:3001/';

process.on('exit', function() {
  blueLED.reset();
  blueCounter.reset();
  redLED.reset();
  redCounter.reset();
});

blueLED = gpio.export(BLUE_LED_PIN, {
  direction: 'out'
});

blueCounter = gpio.export(BLUE_UP_PIN, {
  direction: 'in',
  ready: function() {
    blueCounter.on('change', function() {
      updateGame('blue', 'up');
      console.log('blue up');
    });
  }
});


redLED = gpio.export(RED_LED_PIN, {
  direction: 'out'
});

redCounter = gpio.export(RED_LED_PIN, {
  direction: 'in',
  ready: function() {
    redCounter.on('change', function() {
      updateGame('red', 'up');
      console.log('red up');
    });
  }
});

var updateGame = function(color, direction) {
  request.get(BASE_API_URL + color + '/' + direction);
};

request.get(BASE_API_URL + '/debugip?ip=' + os.networkInterfaces().wlan0[0].address);
