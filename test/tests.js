var test = require('tape');
var ultralight = require('../dist/ultralight-platform.min.js');

test('require the platform', function(t) {
  var ult = require('../dist/ultralight-platform.js')
  t.ok(ult, 'platform required')
  t.end()
})
