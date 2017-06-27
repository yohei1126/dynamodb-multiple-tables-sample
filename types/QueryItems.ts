import { DynamoDB, AWSError } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient({
  region: "ap-northeast-1",
  endpoint: "http://localhost:8000"    
});

const params: DynamoDB.QueryInput = {
    TableName: "Reply",
    IndexName : "PostedBy-Message-Index",
    KeyConditionExpression: "PostedBy = :user",
    ExpressionAttributeValues: {
        ":user": "User A"
    }
};

docClient.query(params, (err: AWSError, data: DynamoDB.QueryOutput) => {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach((item) => {
            console.log(" -", JSON.stringify(item));
        });
    }
});
