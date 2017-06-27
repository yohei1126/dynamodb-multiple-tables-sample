"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const docClient = new aws_sdk_1.DynamoDB.DocumentClient({
    region: "ap-northeast-1",
    endpoint: "http://localhost:8000"
});
const inputs = [
    {
        // partition key only
        TableName: "Reply",
        IndexName: "PostedBy-Message-Index",
        KeyConditionExpression: "PostedBy = :user",
        ExpressionAttributeValues: {
            ":user": "User A"
        }
    },
    {
        // both of partition key and sort key
        TableName: "Reply",
        IndexName: "PostedBy-Message-Index",
        KeyConditionExpression: "PostedBy = :user AND Message = :message",
        ExpressionAttributeValues: {
            ":user": "User A",
            ":message": "DynamoDB Thread 2 Reply 1 text"
        }
    }
];
inputs.forEach((params, index, array) => {
    docClient.query(params, (err, data) => {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else if (data && data.Items) {
            console.log("Query succeeded.");
            data.Items.forEach((item) => {
                console.log(" -", JSON.stringify(item));
            });
        }
    });
});
//# sourceMappingURL=QueryItems.js.map