"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const docClient = new aws_sdk_1.DynamoDB.DocumentClient({
    region: "ap-northeast-1",
    endpoint: "http://localhost:8000"
});
console.log("Querying for movies from 1985.");
const params = {
    TableName: "Reply",
    IndexName: "PostedBy-Message-Index",
    KeyConditionExpression: "PostedBy = :user",
    ExpressionAttributeValues: {
        ":user": "User A"
    }
};
docClient.query(params, (err, data) => {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    }
    else {
        console.log("Query succeeded.");
        data.Items.forEach((item) => {
            console.log(" -", JSON.stringify(item));
        });
    }
});
//# sourceMappingURL=QueryItems.js.map