'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tutorialCtrlStub = {
  index: 'tutorialCtrl.index',
  show: 'tutorialCtrl.show',
  create: 'tutorialCtrl.create',
  update: 'tutorialCtrl.update',
  destroy: 'tutorialCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tutorialIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tutorial.controller': tutorialCtrlStub
});

describe('Tutorial API Router:', function() {

  it('should return an express router instance', function() {
    tutorialIndex.should.equal(routerStub);
  });

  describe('GET /api/tutorials', function() {

    it('should route to tutorial.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tutorialCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tutorials/:id', function() {

    it('should route to tutorial.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tutorialCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tutorials', function() {

    it('should route to tutorial.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tutorialCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tutorials/:id', function() {

    it('should route to tutorial.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tutorialCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tutorials/:id', function() {

    it('should route to tutorial.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tutorialCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tutorials/:id', function() {

    it('should route to tutorial.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tutorialCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
