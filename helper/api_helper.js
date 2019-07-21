const supertest = require('supertest');
const testData = require('../helper/test_data.js');


exports.sendGETRequest = async (baseUrl, apiEndPoint) => {
    try {
        let res = await supertest(baseUrl).get(apiEndPoint).retry(2)
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
            .set('Authorization',testData.apiKey)
        return res;
    } catch (err) {
        console.log('Error in sending GET Request: ', err);
    }
};

exports.sendPOSTRequest = async (baseUrl, apiEndPoint, requestBody) => {
    try {
        let res = await supertest(baseUrl).post(apiEndPoint).retry(2)
        .set('Content-Type', 'application/vnd.api+json')
        .set('Authorization',testData.apiKey)
        .send(requestBody)
        return res;
    } catch (err) {
        console.log('Error in sending POST Request: ', err);
    }
};


exports.sendDELETERequest = async (baseUrl, apiEndPoint) => {
    try {
        let res = await supertest(baseUrl).delete(apiEndPoint).retry(2)
        .set('Content-Type', 'application/vnd.api+json')
        .set('Authorization',testData.apiKey)
        return res;
    } catch (err) {
        console.log('Error in sending DELETE Request: ', err);
    }
};


exports.sendPATCHRequest = async (baseUrl, apiEndPoint, requestBody) => {
    try {
        let res = await supertest(baseUrl).patch(apiEndPoint).retry(2)
        .set('Content-Type', 'application/vnd.api+json')
        .set('Authorization',testData.apiKey)
        .send(requestBody)
        .timeout(5000);
        return res;
    } catch (err) {
        console.log('Error in sending PUT Request: ', err);
    }
};

