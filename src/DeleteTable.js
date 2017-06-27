"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const db = new aws_sdk_1.DynamoDB({
    region: "ap-northeast-1",
    endpoint: "http://localhost:8000"
});
const inputs = [
    { TableName: "ProductCatalog" },
    { TableName: "Forum" },
    { TableName: "Thread" },
    { TableName: "Reply" }
];
inputs.forEach((params, index, array) => {
    db.deleteTable(params, (err, data) => {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
});
//# sourceMappingURL=DeleteTable.js.map