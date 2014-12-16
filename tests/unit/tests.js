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

    it('should allow a simple custom element to be registered', function(cb) {
      var XFoo = document.registerElement('x-foo')
      var el = new XFoo()
      document.body.appendChild(el);
      var nl  = document.querySelectorAll('x-foo')

      expect(el).to.be.an.instanceof(Node)
      expect(el).to.be.an.instanceof(Element)
      expect(el).to.be.an.instanceof(HTMLElement)
      expect(nl.length).to.equal(1)
    })

  })
});
