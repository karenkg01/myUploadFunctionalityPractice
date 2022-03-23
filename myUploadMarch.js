const AWS = require('aws-sdk');
const fs = require('fs');

const ID = 'AKIA4XFD5MLGZS23DYMX';
const SECRET = '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';
const BUCKET_NAME = 'myawsbucketkarenlu';
    
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


exports.handler = async (event, context) => {
    
    const params = {
    Bucket: BUCKET_NAME,
    Key: "temp.txt",
    
    };
    
    
    const preSignedURL = await s3.getSignedUrl("putObject", params);
    
    
    let returnObject = {
            statusCode: 200,
            headers: {
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({
                fileUploadURL: preSignedURL
            })
        };

return returnObject;

}
