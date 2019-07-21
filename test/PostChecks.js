const apiHelper = require('../helper/api_helper.js');
const apiEndPointHelper = require('../helper/api_endpoints.js');
const testData = require('../helper/test_data.js');
var expect = require('chai').expect;
const supertest = require('supertest');


describe('CloudConformity API Test for POST  ... ', () => {

    describe('Create Checks Request Successfully', () => {
       
        let accountId = "oCx-oDsB5", ruleId = "CUSTOM-001", service= "EC2", region = "us-west-2", resourceId = "sg-956d00ea";
        let createCheckPayload = testData.buildPostCheckData(accountId, ruleId, service, region, resourceId);
        let responseData;

        before(async function () {
            let endPoint = '/v1/checks'; 
            responseData = await apiHelper.sendPOSTRequest(apiEndPointHelper.baseUrl, endPoint, createCheckPayload);     
           });


        it('Verify that check is successfully created', async function () {
          while(responseData != null){
            json1= JSON.parse(responseData.text);
            expect(responseData.status).to.equal(200);
          break;
         }
        });

        it('Verify that Check has correct AccountId', async function () {
          while(responseData != null){
            json1= JSON.parse(responseData.text);
            expect(json1.data[0].id).contains(accountId);
            break;
         }
         });

         it('Verify that Check has correct ruleId', async function () {
          while(responseData != null){
            json1= JSON.parse(responseData.text);
            expect(json1.data[0].id).contains(ruleId);
          break;
         }
        });

        it('Verify that Check has correct ServiceName', async function () {
          while(responseData != null){
            json1= JSON.parse(responseData.text);
            expect(json1.data[0].id).contains(service);
          break;
         }
        });

        it('Verify that Check has correct Region', async function () {
          while(responseData != null){
            json1= JSON.parse(responseData.text);
            expect(json1.data[0].id).contains(region);
          break;
         }
        });

        it('Verify that Check has correct resourceId', async function () {
          while(responseData != null){
            json1= JSON.parse(responseData.text);
            expect(json1.data[0].id).contains(resourceId);
          break;
         }
        });       
    });


    describe('Negative scenarios', () => {
       
     let endPoint = '/v1/checks'; 

      it('Optional ResourceId Test', function(done)  {
      let accountId = "oCx-oDsB5", ruleId = "CUSTOM-001", service= "EC2", region = "us-west-2", resourceId = "";
      let createCheckPayload = testData.buildPostCheckData(accountId, ruleId, service, region, resourceId);
      let res = supertest(apiEndPointHelper.baseUrl).post(endPoint)
      .set('Content-Type', 'application/vnd.api+json')
      .set('Authorization',testData.apiKey)
      .timeout(10000)
      .send(createCheckPayload)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.data[0].attributes.resource).contain('');
        done();
        });
      });

      it('Invalid AccountId Tests', function(done)  {
        let accountId = "oCx-oDsB5Test", ruleId = "CUSTOM-001", service= "EC2", region = "us-west-2", resourceId = "";
        let createCheckPayload = testData.buildPostCheckData(accountId, ruleId, service, region, resourceId);
        let res = supertest(apiEndPointHelper.baseUrl).post(endPoint)
        .set('Content-Type', 'application/vnd.api+json')
        .set('Authorization',testData.apiKey)
        .timeout(10000)
        .send(createCheckPayload)
        .expect(401)
         done()
        });

      it('OverWrite CheckId - with same payload ', function(done)  {
        let checkid= 'ccc:oCx-oDsB5:CUSTOM-001:EC2:us-west-2:sg-956d00ea';
        let accountId = "oCx-oDsB5", ruleId = "CUSTOM-001", service= "EC2", region = "us-west-2", resourceId = "sg-956d00ea";
        let createCheckPayload = testData.buildPostCheckData(accountId, ruleId, service, region, resourceId);
        let res = supertest(apiEndPointHelper.baseUrl).post(endPoint)
        .set('Content-Type', 'application/vnd.api+json')
        .set('Authorization',testData.apiKey)
        .timeout(10000)
        .send(createCheckPayload)
        .expect(200)
        .end(function (err, res) {
          expect(res.body.data[0].id).equal(checkid);
          done();
          });
        });

      it('OverWrite CheckId - with different payload ', function(done)  {
          let checkid= 'ccc:oCx-oDsB5:CUSTOM-001:EC2:us-west-2:sg-956d00ea';
          let accountId = "oCx-oDsB5", ruleId = "CUSTOM-001", service= "EC2", region = "us-west-2", resourceId = "sg-956d00eaTest";
          let createCheckPayload = testData.buildPostCheckData(accountId, ruleId, service, region, resourceId);
          let res = supertest(apiEndPointHelper.baseUrl).post(endPoint)
          .set('Content-Type', 'application/vnd.api+json')
          .set('Authorization',testData.apiKey)
          .timeout(10000)
          .send(createCheckPayload)
          .expect(200)
          .end(function (err, res) {
            expect(res.body.data[0].id).not.equal(checkid);
            done();
            });
          });
    });    

});