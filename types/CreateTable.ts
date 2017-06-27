import { DynamoDB, AWSError } from 'aws-sdk';

const db = new DynamoDB({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

const defaultThroughput = {       
    ReadCapacityUnits: 10, 
    WriteCapacityUnits: 10
};

const inputs: DynamoDB.CreateTableInput[] = [
    {
        TableName : "ProductCatalog",
        KeySchema: [
            { AttributeName: "Id", KeyType: "HASH"},
        ],
        AttributeDefinitions: [
            { AttributeName: "Id", AttributeType: "N" }
        ],
        ProvisionedThroughput: defaultThroughput
    },
    {
        TableName : "Forum",
        KeySchema: [
            { AttributeName: "Name", KeyType: "HASH"},
        ],
        AttributeDefinitions: [
            { AttributeName: "Name", AttributeType: "S" }
        ],
        ProvisionedThroughput: defaultThroughput
    },
    {
        TableName : "Thread",
        KeySchema: [
            { AttributeName: "ForumName", KeyType: "HASH"},
            { AttributeName: "Subject", KeyType: "RANGE"},
        ],
        AttributeDefinitions: [
            { AttributeName: "ForumName", AttributeType: "S" },
            { AttributeName: "Subject", AttributeType: "S" }
        ],
        ProvisionedThroughput: defaultThroughput
    },
    {
        TableName : "Reply",
        KeySchema: [
            { AttributeName: "Id", KeyType: "HASH"},
            { AttributeName: "ReplyDateTime", KeyType: "RANGE"},
        ],
        AttributeDefinitions: [
            { AttributeName: "Id", AttributeType: "S" },
            { AttributeName: "ReplyDateTime", AttributeType: "S" },
            { AttributeName: "PostedBy", AttributeType: "S" },
            { AttributeName: "Message", AttributeType: "S" }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: "PostedBy-Message-Index", 
                KeySchema: [
                    { AttributeName: "PostedBy", KeyType: "HASH" },
                    { AttributeName: "Message", KeyType: "RANGE" }
                ],
                Projection: { 
                    ProjectionType: "ALL"
                },
                ProvisionedThroughput: defaultThroughput
            }
        ],
        ProvisionedThroughput: defaultThroughput
    }
];

inputs.forEach((params: DynamoDB.CreateTableInput, index: number, array: DynamoDB.DeleteTableInput[]) => {
    db.createTable(params, (err: AWSError, data: DynamoDB.CreateTableOutput) => {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
});
