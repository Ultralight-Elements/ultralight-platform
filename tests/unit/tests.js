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
      var XOne = document.registerElement('x-one')
      var el = new XOne()
      document.body.appendChild(el);
      var nl  = document.querySelectorAll('x-one')

      expect(el).to.be.an.instanceof(Node)
      expect(el).to.be.an.instanceof(Element)
      expect(el).to.be.an.instanceof(HTMLElement)
      expect(nl.length).to.equal(1)
      document.body.removeChild(el)
      nl = document.querySelectorAll('x-one')
      expect(nl.length).to.equal(0)
      expect(true).to.equal(true)
    })

    it('should allow a simple custom element which explicitly sets it\'s prototype to HTMLElement', function(cb) {
      var XTwo = document.registerElement('x-two', {
        prototype: Object.create(HTMLElement.prototype)
      })
      var el = new XTwo()
      document.body.appendChild(el)
      var nl = document.querySelectorAll('x-two')

      expect(el).to.be.an.instanceof(Node)
      expect(el).to.be.an.instanceof(Element)
      expect(el).to.be.an.instanceof(HTMLElement)
      expect(nl.length).to.equal(1)
    })

    
  })
});
