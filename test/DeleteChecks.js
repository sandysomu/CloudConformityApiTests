 const apiHelper = require('../helper/api_helper.js');
 const apiEndPointHelper = require('../helper/api_endpoints.js');
 const testData = require('../helper/test_data.js');
 var expect = require('chai').expect;
 

 describe('CloudConformity API Test for DELETE  ... ', () => {
    describe('DELETE Request', function () {

        let checkId;
        let accountId = "oCx-oDsB5", ruleId = "CUSTOM-001", service= "EC2", region = "us-west-2", resourceId = "sg-Delete";
        let createCheckPayload = testData.buildPostCheckData(accountId, ruleId, service, region, resourceId);
        let responseData; let deleted=false;

        //Create one check which can be deleted
        before(async function () {
            let endPoint = '/v1/checks'; 
            responseData = await apiHelper.sendPOSTRequest(apiEndPointHelper.baseUrl, endPoint, createCheckPayload);     
            expect(responseData.status).to.equal(200);  
            checkId= JSON.parse(responseData.text).data[0].id;   
            expect(responseData.body.data[0].id).to.not.equal(null);  
            expect(responseData.body.data[0].type).to.not.equal(null); 
            expect(responseData.body.data[0].attributes.region).to.not.equal(null); 
            expect(responseData.body.data[0].attributes.resource).to.not.equal(null);
        });


        it('Verify that check is successfully created for deletion', async function () {
          while(responseData != null){
            let endPoint = '/v1/checks/'+ checkId;
            let res = await apiHelper.sendDELETERequest(apiEndPointHelper.baseUrl, endPoint);
            expect(res.status).to.equal(200);
            expect(res.body.meta[0].message).equals('Check successfully deleted');
            deleted=true;
          break;
         }
        });

        it('Verify that check has been delete successfuly', async function () {
            while(deleted){
                let endPoint = '/v1/checks/'+ checkId;
                responseData=  await apiHelper.sendGETRequest(apiEndPointHelper.baseUrl,endPoint);
                expect(responseData.status).to.equal(401); // check with CC if valid response code.
                break;
                }
        });
   
    });

});