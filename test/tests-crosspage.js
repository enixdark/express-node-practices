var Browser = require('zombie'),
    assert = require('chai').assert;

var browser;

suite("Cross-Page test", function(){
    setup(function(){
        browser = new Browser();
    });
    test('request a group rate quote from hood river page', function(page){
        var referrer = 'http://localhost:8000/tours/hood-river';
        browser.visit(referrer,function(){
           browser.clickLink('.requestGroupRate',function(){
               assert(browser.field('referrer') === referrer);
               done();
           });
        });
    });

    test('request a group rate from oren cost',function(page){
        var referrer = 'http://localhost:8000/tours/oregon-cost';
        browser.visit(referrer,function(){
            browser.clickLink('.requestGroupRate', function(){
                assert(browser.field('referrer').value
                === referrer);
                done();
            });
        });
    });

    test('visiting the "request group rate" page dirctly should result ' +
    'in an empty referrer field', function(done){
        browser.visit('http://localhost:8000/tours/request-group-rate',
            function(){
                assert(browser.field('referrer').value === '');
                done();
            });
    });
});