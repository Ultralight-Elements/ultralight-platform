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

    it('should allow a simple custom element to be registered', function() {
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
    })

    it('should allow a custom element which explicitly sets it\'s prototype to HTMLElement', function() {
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
      document.body.removeChild(el)
      nl = document.querySelectorAll('x-two')
      expect(nl.length).to.equal(0)
    })

    it('should allow you to extend native elements (create type extension custom elements)', function() {
      var XThree = document.registerElement('x-three', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'button'
      })

      var el = new XThree()
      var div = document.createElement('div')
      div.innerHTML = '<button is="x-three"></button>'
      document.body.appendChild(div)
      var nl = document.querySelectorAll('button[is]')

      expect(el).to.be.an.instanceof(Node)
      expect(el).to.be.an.instanceof(Element)
      expect(el).to.be.an.instanceof(HTMLElement)
      expect(el).to.be.an.instanceof(HTMLButtonElement)
      expect(nl.length).to.equal(1)

      document.body.removeChild(div)
      nl = document.querySelectorAll('button[is]')
      expect(nl.length).to.equal(0)
    })

    it('should allow you to extend custom elements', function() {
      var XFour = document.registerElement('x-four', {
        prototype: Object.create(HTMLElement.prototype)
      })
      var XFive = document.registerElement('x-five', {
        prototype: Object.create(XFour.prototype)
        //extends: 'x-four'
      })

      var el = new XFive()
      document.body.appendChild(el)
      var nl = document.querySelectorAll('x-five')

      expect(el).to.be.an.instanceof(Node)
      expect(el).to.be.an.instanceof(Element)
      expect(el).to.be.an.instanceof(HTMLElement)
      expect(el).to.be.an.instanceof(XFour)
      expect(nl.length).to.equal(1)

      document.body.removeChild(el)
      nl = document.querySelectorAll('x-five')
      expect(nl.length).to.equal(0)
    })
  })

  describe('Instantiating custom tags', function() {

    it('should create custom elements by declaring them with the tag', function() {
      var XSix = document.registerElement('x-six')
      var div = document.createElement('div')
      div.innerHTML = '<x-six></x-six>'

      document.body.appendChild(div)
      var nl = document.querySelectorAll('x-six')
      expect(nl.length).to.equal(1)

      document.body.removeChild(div)
      nl = document.querySelectorAll('x-six')
      expect(nl.length).to.equal(0)
    })

    it('should create custom elements with DOM in JS', function() {
      document.registerElement('x-seven')
      var xseven = document.createElement('x-seven')

      document.body.appendChild(xseven)
      var nl = document.querySelectorAll('x-seven')
      expect(nl.length).to.equal(1)

      document.body.removeChild(xseven)
      nl = document.querySelectorAll('x-seven')
      expect(nl.length).to.equal(0)
    })

    it('should create custom elements with the new operator', function() {
      var XEight = document.registerElement('x-eight')
      var xeight = new XEight()

      document.body.appendChild(xeight)
      var nl = document.querySelectorAll('x-eight')
      expect(nl.length).to.equal(1)

      document.body.removeChild(xeight)
      nl = document.querySelectorAll('x-eight')
      expect(nl.length).to.equal(0)
    })
  })

  describe('Instantiating type extension elements', function() {

    it('should create type extention elements by declaring them with the tag', function() {

      var XNine = document.registerElement('x-nine', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'button'
      })

      var div = document.createElement('div')
      div.innerHTML = '<button is="x-nine"></button>'
      document.body.appendChild(div)

      var nl = document.querySelectorAll('button[is=x-nine]')
      expect(nl.length).to.equal(1)

      document.body.removeChild(div)
      nl = document.querySelectorAll('button[is=x-nine]')
      expect(nl.length).to.equal(0)
    })

    it('should create type extention elements with DOM in JS', function() {
      var XTen = document.registerElement('x-ten', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'button'
      })

      var xten = document.createElement('button', 'x-ten')
      document.body.appendChild(xten)
      var nl = document.querySelectorAll('button[is=x-ten]')
      expect(nl.length).to.equal(1)

      document.body.removeChild(xten)
      nl = document.querySelectorAll('button[is=x-ten]')
      expect(nl.length).to.equal(0)
    })

    it('should create type extension elements with the new operator', function() {
      var XEleven = document.registerElement('x-eleven', {
        prototype: Object.create(HTMLButtonElement.prototype),
        extends: 'button'
      })

      var xeleven = new XEleven()
      document.body.appendChild(xeleven)
      var nl = document.querySelectorAll('button[is=x-eleven]')
      expect(nl.length).to.equal(1)

      document.body.removeChild(xeleven)
      nl = document.querySelectorAll('button[is=x-eleven]')
      expect(nl.length).to.equal(0)
    })
  })

  describe('Adding properties and methods', function() {

    it('should create a property assigned to the prototype', function() {

      var XTwelveProto = Object.create(HTMLElement.prototype)
      XTwelveProto.foo = 'foo'
      var XTwelve = document.registerElement('x-twelve', {
        prototype: XTwelveProto
      })
      var xtwelve = document.createElement('x-twelve')
      document.body.appendChild(xtwelve)

      var nl = document.querySelectorAll('x-twelve')
      expect(nl[0].foo).to.equal('foo')

      document.body.removeChild(xtwelve)
      nl = document.querySelectorAll('x-twelve')
      expect(nl.length).to.equal(0)
    })

    it('should create a method assigned to the prototype', function() {

      var XThirteenProto = Object.create(HTMLElement.prototype)
      XThirteenProto.foo = function() {return 'foo'}
      var XThirteen = document.registerElement('x-thirteen', {
        prototype: XThirteenProto
      })
      var xthirteen = document.createElement('x-thirteen')
      document.body.appendChild(xthirteen)

      var nl = document.querySelectorAll('x-thirteen')
      expect(nl[0].foo()).to.equal('foo')

      document.body.removeChild(xthirteen)
      nl = document.querySelectorAll('x-thirteen')
      expect(nl.length).to.equal(0)
    })

    it('should create a property using Object.defineProperty', function() {
      var XFourteenProto = Object.create(HTMLElement.prototype)
      Object.defineProperty(XFourteenProto, 'bar', {value: 'bar'})
      var XFourteen = document.registerElement('x-fourteen', {
        prototype: XFourteenProto
      })
      var xfourteen = document.createElement('x-fourteen')
      document.body.appendChild(xfourteen)

      var nl = document.querySelectorAll('x-fourteen')
      expect(nl[0].bar).to.equal('bar')

      document.body.removeChild(xfourteen)
      nl = document.querySelectorAll('x-fourteen')
      expect(nl.length).to.equal(0)
    })

    it('should create elements in Object.defineProperties style', function() {
      var XFifteen = document.registerElement('x-fifteen', {
        prototype: Object.create(HTMLElement.prototype, {
          foo: {
            get: function() {return 'foo'}
          },
          bar: {
            value: function() {
              return 'bar'
            }
          }
        })
      })

      var xfifteen = document.createElement('x-fifteen')
      document.body.appendChild(xfifteen)
      var nl = document.querySelectorAll('x-fifteen')

      expect(nl.length).to.equal(1)
      expect(nl[0]['foo']).to.equal('foo')
      expect(nl[0].bar()).to.equal('bar')

      document.body.removeChild(xfifteen)
      nl = document.querySelectorAll('x-fifteen')
      expect(nl.length).to.equal(0)
    })
  })

  describe('Lifecycle callback methods', function() {

    it('supports createdCallback', function() {
      var XSixteenProto = Object.create(HTMLElement.prototype)
      XSixteenProto.createdCallback = function() {
        XSixteenProto.foo = 'foo'
      }
      var XSixteen = document.registerElement('x-sixteen', {prototype: XSixteenProto})
      var xsixteen = document.createElement('x-sixteen')
      expect(xsixteen.foo).to.equal('foo')
    })

    it('supports attachedCallback', function() {
      var dfd = this.async(100)

      var XSeventeenProto = Object.create(HTMLElement.prototype)
      XSeventeenProto.attachedCallback = function() {
        XSeventeenProto.foo = 'foo'
      }
      var XSeventeen = document.registerElement('x-seventeen', {prototype: XSeventeenProto})

      var xseventeen = document.createElement('x-seventeen')
      expect(xseventeen.foo).to.not.exist
      document.body.appendChild(xseventeen)
      setTimeout(dfd.callback(function() {
        expect(xseventeen.foo).to.equal('foo')
      }), 10)
    })

    it('supports detatchedCallback', function() {
      var dfd = this.async(100);

      var XEighteenProto = Object.create(HTMLElement.prototype)
      XEighteenProto.detachedCallback = function() {
        XEighteenProto.foo = 'foo'
      }
      var XEighteen = document.registerElement('x-eighteen', {prototype: XEighteenProto})

      var xeighteen = document.createElement('x-eighteen')
      expect(xeighteen.foo).to.not.exist
      document.body.appendChild(xeighteen)
      expect(xeighteen.foo).to.not.exist
      document.body.removeChild(xeighteen)
      setTimeout(dfd.callback(function() {
        expect(xeighteen.foo).to.equal('foo')
      }), 10)
    })

    it('supports attributeChangedCallback', function() {
      var XNineteenProto = Object.create(HTMLElement.prototype)
      XNineteenProto.attributeChangedCallback = function(attrName, oldVal, newVal) {
        if (attrName === 'foo') {
          expect(oldVal).to.equal('foo')
          expect(newVal).to.equal('bar')
        }
      }
      var XNineteen = document.registerElement('x-nineteen', {prototype: XNineteenProto})
      var div = document.createElement('div')
      div.innerHTML = '<x-nineteen foo="foo"></x-nineteen>'
      document.body.appendChild(div)
      var nl = document.querySelectorAll('x-nineteen')
      nl[0].setAttribute('foo', 'bar')
    })
  })

  describe('Custom Events', function() {

    it('has custom event constructor', function() {
      expect(CustomEvent).to.exist
    })

    it('works with custom elements', function() {
      var dfd = this.async(100)
      document.registerElement('x-ce')
      var el = document.createElement('x-ce')
      el.addEventListener('foo', dfd.callback(function(e) {
        expect(true).to.equal(true)
        expect(e).to.exist
        expect(e.type).to.equal('foo')
      }))
      var event = new CustomEvent('foo')
      el.dispatchEvent(event)
    })
  })
})
