import { DynamoDB, AWSError } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient({
  region: "ap-northeast-1",
  endpoint: "http://localhost:8000"    
});

const inputs: DynamoDB.QueryInput[] = [
    {
        // partition key only
        TableName: "Reply",
        IndexName : "PostedBy-Message-Index",
        KeyConditionExpression: "PostedBy = :user",
        ExpressionAttributeValues: {
            ":user": "User A"
        }
    },
    {
        // both of partition key and sort key
        TableName: "Reply",
        IndexName : "PostedBy-Message-Index",
        KeyConditionExpression: "PostedBy = :user AND Message = :message",
        ExpressionAttributeValues: {
            ":user": "User A",
            ":message": "DynamoDB Thread 2 Reply 1 text"
        }
    }
];

inputs.forEach((params: DynamoDB.QueryInput, index: number, array: DynamoDB.QueryInput[]) => {
    docClient.query(params, (err: AWSError, data: DynamoDB.QueryOutput) => {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else if (data && data.Items) {
            console.log("Query succeeded.");
            data.Items.forEach((item) => {
                console.log(" -", JSON.stringify(item));
            });
        }
    });
});
