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

      this.skip()

      var XFour = document.registerElement('x-four', {
        prototype: Object.create(HTMLElement.prototype)
      })
      var XFive = document.registerElement('x-five', {
        prototype: Object.create(XFour.prototype),
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
      var dfd = this.async(1000)

      var XSixteenProto = Object.create(HTMLElement.prototype)
      XSixteenProto.createdCallback = dfd.callback(function() {
        XSixteenProto.foo = 'foo'
        expect(XSixteenProto.foo).to.equal('foo')
      })
      var XSixteen = document.registerElement('x-sixteen', {prototype: XSixteenProto})
      var xsixteen = document.createElement('x-sixteen')
    })

    it('supports attachedCallback', function() {
      var dfd = this.async(1000)

      var XSeventeenProto = Object.create(HTMLElement.prototype)
      XSeventeenProto.attachedCallback = dfd.callback(function() {
        XSeventeenProto.foo = 'foo'
        expect(XSeventeenProto.foo).to.equal('foo')
      })
      var XSeventeen = document.registerElement('x-seventeen', {prototype: XSeventeenProto})

      var xseventeen = document.createElement('x-seventeen')
      expect(xseventeen.foo).to.not.exist
      document.body.appendChild(xseventeen)
    })

    it('supports detatchedCallback', function() {
      var dfd = this.async(1000);

      var XEighteenProto = Object.create(HTMLElement.prototype)
      XEighteenProto.detachedCallback = dfd.callback(function() {
        XEighteenProto.foo = 'foo'
        expect(XEighteenProto.foo).to.equal('foo')
      })
      var XEighteen = document.registerElement('x-eighteen', {prototype: XEighteenProto})

      var xeighteen = document.createElement('x-eighteen')
      expect(xeighteen.foo).to.not.exist
      document.body.appendChild(xeighteen)
      expect(xeighteen.foo).to.not.exist
      document.body.removeChild(xeighteen)
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

  describe('dom4', function() {
    describe('prepend', function() {
      it('supports prepend with single node', function() {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        div.prepend(cp)
        var qs = div.querySelector('p')
        expect(qs).to.equal(cp)

        document.body.removeChild(div)
      })

      it('supports prepend with multiple nodes', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp1 = document.createElement('p')
        var cp2 = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        div.prepend(cp1, cp2)
        var qs = div.querySelector('p')
        expect(qs).to.equal(cp1)
        qs = document.querySelectorAll('p')
        expect(qs.length).to.equal(3)

        document.body.removeChild(div)
      })
    })
    describe('append', function() {
      it('supports append with a single node', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        div.append(cp)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(2)
        expect(div.lastChild).to.equal(cp)

        document.body.removeChild(div)
      })
      it('supports append with multiple  nodes', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp1 = document.createElement('p')
        var cp2 = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        div.append(cp1, cp2)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(3)
        expect(div.lastChild).to.equal(cp2)

        document.body.removeChild(div)
      })
    })

    describe('before', function() {
      it('supports before with a single node', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        co.before(cp)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(2)
        expect(div.firstChild).to.equal(cp)

        document.body.removeChild(div)
      })
      it('supports before with a multiple nodes', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp1 = document.createElement('p')
        var cp2 = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        co.before(cp1, cp2)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(3)
        expect(div.firstChild).to.equal(cp1)

        document.body.removeChild(div)
      })
    })

    describe('after', function() {
      it('supports after with a single node', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        co.after(cp)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(2)
        expect(div.lastChild).to.equal(cp)

        document.body.removeChild(div)
      })
      it('supports after with a multiple nodes', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp1 = document.createElement('p')
        var cp2 = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        co.after(cp1, cp2)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(3)
        expect(div.lastChild).to.equal(cp2)

        document.body.removeChild(div)
      })
    })





    describe('replace', function() {
      it('supports replace with a single node', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        co.replace(cp)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(1)
        expect(div.firstChild).to.equal(cp)

        document.body.removeChild(div)
      })
      it('supports replace with a multiple nodes', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        var cp1 = document.createElement('p')
        var cp2 = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        co.replace(cp1, cp2)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(2)
        expect(div.lastChild).to.equal(cp2)

        document.body.removeChild(div)
      })
    })

    describe('remove', function() {
      it('supports remove', function(cb) {
        var div = document.createElement('div')
        var co = document.createElement('p')
        document.body.appendChild(div)

        div.appendChild(co)
        var qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(1)
        co.remove()
        qs = div.querySelectorAll('p')
        expect(qs.length).to.equal(0)

        document.body.removeChild(div)
      })
    })

    describe('classList', function() {
      it('supports add', function() {
        var div = document.createElement('div')
        document.body.appendChild(div)

        div.classList.add('foo')
        var qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(1)

        document.body.removeChild(div)
      })

      it('supports remove', function() {
        var div = document.createElement('div')
        document.body.appendChild(div)

        div.innerHTML = '<p class="foo"></p>'
        var qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(1)
        qs[0].classList.remove('foo')
        qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(0)

        document.body.removeChild(div)
      })

      it('supports toggle', function() {
        var div = document.createElement('div')
        document.body.appendChild(div)

        var qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(0)
        div.classList.toggle('foo')
        qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(1)
        div.classList.toggle('foo')
        qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(0)

        document.body.removeChild(div)
      })

      it('supports contains', function() {
        var div = document.createElement('div')
        document.body.appendChild(div)

        var qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(0)
        expect(div.classList.contains('foo')).to.equal(false)
        div.classList.add('foo')
        qs = document.querySelectorAll('.foo')
        expect(qs.length).to.equal(1)
        expect(div.classList.contains('foo')).to.equal(true)

        document.body.removeChild(div)
      })
    })

    describe('closest', function() {
      it('Returns the first inclusive ancestor ', function(cb) {
        var div = document.createElement('div')
        var pdiv = document.createElement('div')
        var cp = document.createElement('p')
        pdiv.appendChild(cp)
        div.appendChild(pdiv)
        document.body.appendChild(div)

        expect(cp.closest('div')).to.equal(pdiv)
        expect(pdiv.closest('div')).to.equal(pdiv)

        document.body.removeChild(div)
      })
    })

    describe('matches', function() {
      it('returns true if matching selectors against element\'s root yields element, and false otherwise', function(cb) {
        var div = document.createElement('div')
        var pdiv = document.createElement('div')
        var cp = document.createElement('p')
        pdiv.appendChild(cp)
        div.appendChild(pdiv)
        document.body.appendChild(div)

        expect(cp.matches('p')).to.equal(true)
        expect(pdiv.matches('div')).to.equal(true)

        document.body.removeChild(div)
      })
    })
  })
})
