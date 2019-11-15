let chai = require('chai')
const expect = require('chai').expect
chai.use(require('chai-dom'))
const assert = require('chai').assert
var should = require('chai').should()

let script = require('../script.js')
const jsdom  = require('jsdom')
const {JSDOM} = jsdom
let random = Math.random() * 10
const dom = new JSDOM(`<html><body><div class="wrapper" id=${random}></div></body></html>`)
global.window = dom.window
global.document = dom.window.document

let View = script.View
let view = new View(random)
let Model = script.Model
let model = new Model(random)
let Controller = script.Controller
let controller = new Controller(view, model)

let createElement = script.createElement

let between = document.querySelector('.between')
let begin = document.querySelector('.begin')
let end = document.querySelector('.end')
let num1 = document.querySelector('.num1')

describe('check function createElement', function () {
  
    it ('test how function create element input this his properties', function () {
        let slider = createElement('input', {class: 'slider', type: 'range', value: '15000'})
        slider.should.be.an('HTMLInputElement')
        slider.should.have.class('slider')
        expect(slider).to.have.attribute('type', 'range')
        slider.should.have.value('15000') 
    })
    it ('test how funtion create element div this one child', function () {
        let slider = createElement('input', {class: 'slider', type: 'range', value: '70000'})
        let range = createElement('div', {class: 'Range'}, slider)
        range.should.be.an('HTMLDivElement')
        range.should.have.html('<input class="slider" type="range" value="70000">')
    })

})

describe('View', function () {

    it ('test function viewBetween', function () {
        view.viewBetween(10, 85)
        assert.equal(between.style._values['margin-left'], '10px')
        assert.equal(between.style._values['width'], '85px')
    })
    it ('test function viewScale which show begin and end of scale', function () {
        view.viewScale(100, 500)
        assert.equal(begin.innerHTML, '100')
        assert.equal(end.innerHTML, '500')
    })
    it ('test function viewNum which show numbers over slider balls', function () {
        view.viewNum(num1, 5000, 46)
        assert.equal(num1.innerHTML, '5000')
        assert.equal(num1.style._values['margin-left'], '46px')
    })
})

describe('Model', function () {

    it ('test function helper which use for helping in work with DOM', function () {
        let $ = model.helper()
        $.el.should.be.an('HTMLInputElement')
        $.el.should.have.class('slider1')
        $.el2.should.be.an('HTMLInputElement')
        $.el2.should.have.class('slider2')
        assert.equal($.slWidth, 266)
        assert.equal($.widthScale, 25000)
        assert.equal($.betwLength, 106.4)
        assert.equal($.value, 5000)
        assert.equal($.value2, 15000)
        assert.equal($.left, 53.2)
        assert.equal($.right, 159.6)
        $.min.should.be.an('HTMLInputElement')
        assert.equal($.min.value, '0')
        $.max.should.be.an('HTMLInputElement')
        assert.equal($.max.value, '25000')
        $.num1.should.be.an('HTMLDivElement')
        $.num2.should.be.an('HTMLDivElement')
        $.val1.should.be.an('HTMLInputElement')
        assert.equal($.val1.value, '5000')
        $.val2.should.be.an('HTMLInputElement')
        assert.equal($.val2.value, '15000')
    })

    it ('test function modelBetween which starts function viewBetween and passes to her two arguments - margin-left and width of HTMLDivElement between', function () {
        model.modelBetween(view.viewBetween)
        assert.equal(between.style._values['margin-left'], '53.2px')
        assert.equal(between.style._values['width'], '106.4px')
    })
    it ("test function modelScale which starts function viewScale and passes two arguments min amd max values of scale from panel", function () {
        model.modelScale(view.viewScale)
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
    })
    
    
})

describe("Controller", function () {

    it('test function controllerBetween which starts function modelBetween and passes to her one argument - function viewBetween', function () {
        controller.controllerBetween()
        assert.equal(between.style._values['margin-left'], '53.2px')
        assert.equal(between.style._values['width'], '106.4px')
    })
    it('test function controllerScale which starts function modelScale and passes one argument - function viewScale', function () {
        controller.controllerScale()
        assert.equal(begin.innerHTML, '0')
        assert.equal(end.innerHTML, '25000')
    })

})