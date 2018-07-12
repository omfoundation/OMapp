// At the top of test/index.test.js
const test = require('firebase-functions-test')();

//console.log(test);

const assert = require('assert');

const admin = require('firebase-admin');

const sinon = require('sinon');

describe('Cloud Functions', () => {

  before(() => {
    // Hacer tareas preparativas a la prueba
  });

  after(() => {
    test.cleanup();
  });

  describe('makeUserRecord', () => {
    // Test Case: setting messages/{pushId}/original to 'input' should cause 'INPUT' to be written to
    // messages/{pushId}/uppercase
    it('should pass"', () => {
      // [START assertOffline]
      const user = test.auth.makeUserRecord({email: 'luis.morin@gmail.com'});

      //console.log(user);

      return assert.equal(user.email, 'luis.morin@gmail.com');
      // [END assertOffline]
    })
  });

})