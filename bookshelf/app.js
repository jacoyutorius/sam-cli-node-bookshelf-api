const AWS = require('aws-sdk')
let response;

var dynamoOpt = {
  apiVersion: '2012-08-10',
  endpoint: "http://192.168.20.106:8000"
};
var documentClient = new AWS.DynamoDB.DocumentClient(dynamoOpt);

exports.lambda_handler = (event, context, callback) => {
  try {
    switch (event.httpMethod) {
      case "GET":
        var params = {
          TableName: "Books"
        };
        documentClient.scan(params, (err, data) => {
          response = {
            "statusCode": 200,
            "body": JSON.stringify(data.Items)
          }
          callback(null, response);
          return;
        })
        break;
      default:
        response = {
          "statusCode": 501
        }
    }
  } catch (err) {
    console.log(err);
    callback(err, null);
  }
};