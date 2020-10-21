const { assert, expect } = require('chai');
const { describe, before, it } = require('mocha');
const getCurrentStockLevel = require('../src/checkstock');

const sku = 'NSW555582/99/27';

describe('Test stock level checker', function() {
  it('Verify check stock return value', function(done) {
    getCurrentStockLevel(sku)
      .then((resp) => {
        assert.isNotNull(resp.sku);
        expect(resp.sku).to.be.a('string');
        assert.isNotNull(resp.qty);
        expect(resp.qty).to.be.a('number');
        done();
      }).catch(err => {
        return assert.throws('Get stock level failed');
        done();
      });
  });
  
  it('Verify fail', function(done) {
    let funcResp = false;
    getCurrentStockLevel()
      .then((resp) => {
        funcResp = true;
        assert.fail('expected fail');
      }).catch(err => {
        if(funcResp) {
          assert.fail('expected fail');
        }
        done();
      });
  });
});