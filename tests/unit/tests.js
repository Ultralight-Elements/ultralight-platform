define([
  'intern!bdd',
  'intern/chai!expect',
  'platform/ultralight-platform.min'
], function(bdd, expect, platform) {
  var describe = bdd.describe.bind(bdd)
  var it = bdd.it.bind(bdd)

  describe('ultralight-platform', function() {
    it('shoud add document.registerElement', function() {
      expect(document).to.have.property('registerElement')
    })
  })
});
