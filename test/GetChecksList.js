const apiHelper = require('../helper/api_helper.js');
const apiEndPointHelper = require('../helper/api_endpoints.js');
const testData = require('../helper/test_data.js');
var expect = require('chai').expect;

describe('CloudConformity API Test for GET  ... ', () => {
 
    describe('Get multiple checks ..', () => {
        it('User gets list of all checks', async function() {
        let endPoint = '/v1/checks?page\[size\]='+testData.pageSize+ '&page\[number\]='+testData.pageNumber+ '&accountIds='+testData.accountIds+ '';
        
        let responseData=  await apiHelper.sendGETRequest(apiEndPointHelper.baseUrl,endPoint);
        expect(responseData.status).to.equal(200);
        expect(responseData.body.data.length).greaterThan(1);
        })
    });  


    describe('Get single check ..', () => {
        it('User gets list of all checks', async function() {
        let endPoint = '/v1/checks/'+ 'ccc:oCx-oDsB5:CUSTOM-001:EC2:us-west-2:sg-956d00ea';
        let responseData=  await apiHelper.sendGETRequest(apiEndPointHelper.baseUrl,endPoint);
        expect(responseData.status).to.equal(200);   
        expect(responseData.body.data.id).to.not.equal(null);  
        expect(responseData.body.data.type).to.not.equal(null); 
        expect(responseData.body.data.attributes.region).to.not.equal(null); 
        expect(responseData.body.data.attributes.resource).to.not.equal(null);
        })
    });  

});