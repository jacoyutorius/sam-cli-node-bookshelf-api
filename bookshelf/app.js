const AWS = require('aws-sdk')
let response;

var dynamoOpt = {
  apiVersion: '2012-08-10',
  // endpoint: "http://192.168.1.3:8000"
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

      case "POST":
        var params = {
          TableName: "Books",
          Item: JSON.parse(event.body)
        }
        documentClient.put(params, (err, data) => {
          response = {
            "statusCode": 200,
            "body": JSON.stringify(data)
          }
          callback(null, response);
          return;
        })
        break;

      case "PUT":
        var params = {
          TableName: "Books",
          Item: JSON.parse(event.body)
        }
        documentClient.put(params, function (err, data) {
          response = {
            "statusCode": 200,
            "body": JSON.stringify(data)
          }
          callback(null, response);
          return;
        });

        break;

      case "DELETE":
        console.dir(event.body)
        var params = {
          TableName: "Books",
          Key: JSON.parse(event.body)
        }

        documentClient.delete(params, (err, data) => {
          response = {
            "statusCode": 200,
            "body": JSON.stringify(data)
          }
          callback(null, response)
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