//Contains all the test data to be used in the suite
exports.apiKey = '';
exports.accountIds='oCx-oDsB5';
exports.pageNumber=0;
exports.pageSize=100;


exports.buildPostCheckData = function buildPostCheckData(accountId, ruleId, service, region, resourceId)
   {  
     return {
       "data": 
      {
        "type": "checks",
        "attributes": {
          "message": "Descriptive message about this check - Test",
          "region": region,
          "resource": resourceId,
          "risk-level": "VERY_HIGH",
          "status": "FAILURE",
          "service": service,
          "categories": ["security"],
          "tags": ["key0::value0", "key1::value1"]
        },
        "relationships": {
          "account": {
            "data": {
              "id": accountId,
              "type": "accounts"
            }
          },
          "rule": {
            "data": {
              "id": ruleId,
              "type": "rules"
            }
          }
        }
      }
    }
  };

  exports.buildPatchCheckData = function buildPostCheckData(accountId, ruleId, service, region, resourceId, status)
  {  
    return {
      "data": 
     {
       "type": "checks",
       "attributes": {
         "message": "Descriptive message about this check - Test",
         "region": region,
         "resource": resourceId,
         "risk-level": "VERY_HIGH",
         "status": status,
         "service": service,
         "categories": ["security"],
         "tags": ["key0::value0", "key1::value1"]
       },
       "relationships": {
         "account": {
           "data": {
             "id": accountId,
             "type": "accounts"
           }
         },
         "rule": {
           "data": {
             "id": ruleId,
             "type": "rules"
           }
         }
       }
     }
   }
 };
