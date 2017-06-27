import { DynamoDB, AWSError} from 'aws-sdk';

const db = new DynamoDB({
    region: "ap-northeast-1",
    endpoint: "http://localhost:8000"
});

const inputs: Array<DynamoDB.DeleteTableInput> = [
    { TableName : "ProductCatalog" },
    { TableName : "Forum" },
    { TableName : "Thread" },
    { TableName : "Reply" }
];

inputs.forEach((params, index, array) => {
    db.deleteTable(params, (err: AWSError, data: DynamoDB.DeleteTableOutput) => {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
});