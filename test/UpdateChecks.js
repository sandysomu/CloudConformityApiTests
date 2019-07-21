 const apiHelper = require('../helper/api_helper.js');
 const apiEndPointHelper = require('../helper/api_endpoints.js');
 const testData = require('../helper/test_data.js');
 var expect = require('chai').expect;
 

 describe('CloudConformity API Test for UPDATE  ... ', () => {
     describe('DELETE Request', function () {

        let checkId;
        let accountId = "oCx-oDsB5", ruleId = "CUSTOM-001", service= "EC2", region = "us-west-2", resourceId = "sg-Update", status = "SUCCESS";
        let createCheckPayload = testData.buildPostCheckData(accountId, ruleId, service, region, resourceId);
        let PatchCheckPayload = testData.buildPatchCheckData(accountId, ruleId, service, region, resourceId, status);
        let responseData; let deleted=false;

        //Create one check which can be updated
        before(async function () {
            let endPoint = '/v1/checks'; 
            responseData = await apiHelper.sendPOSTRequest(apiEndPointHelper.baseUrl, endPoint, createCheckPayload);     
            expect(responseData.status).to.equal(200);  
            checkId= JSON.parse(responseData.text).data[0].id;   
            expect(responseData.body.data[0].id).to.not.equal(null);  
            expect(responseData.body.data[0].type).to.not.equal(null); 
            expect(responseData.body.data[0].attributes.region).to.not.equal(null); 
            expect(responseData.body.data[0].attributes.resource).to.not.equal(null);
            expect(responseData.body.data[0].attributes.status).equals('FAILURE');
        });


        it('Verify that check is successfully updated.', async function () { // updated the status and confirmed UPDATE response
          while(responseData != null){
            let endPoint = '/v1/checks/'+ checkId;
            responseData=  await apiHelper.sendPATCHRequest(apiEndPointHelper.baseUrl,endPoint, PatchCheckPayload);
        
            expect(responseData.body.data.attributes.status).equal('SUCCESS');
            expect(responseData.status).to.equal(200);
            break;
         }
        });

        
   
    });

});