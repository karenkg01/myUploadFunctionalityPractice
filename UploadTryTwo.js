const AWS = require('aws-sdk')
const SSM = new AWS.SSM();
const os = require('os')
const https = require('https')
const fs = require('fs');
const http = require('http')
// const request = require('request-promise')
// var axios = require('axios')
let response;

const accessingS3 = async (s3, key) => {
        
        //const bucket = process.env.BUCKET
        
        const params= {
            Bucket: 'myawsbucketkarenlu',
            Key: key,
        };
        
        return await new Promise((resolve,reject)=> {
            s3.getSignedUrl('putObject',params, function(err,url){
                if(err){
                    reject(err);
                }else{
                    console.log("Key", key);
                    console.log('Signed URL:' , url)
                    resolve(url)
                }
            });
        });
    };
    
    
exports.handler = async(event)=> {
        try{
            // const ssm_cert_password_params={"Name": "xxx", "WithDecryption":true};
            // const ssm_ad_account_params = {"":""}
            // const ssm_ad_xxx_params = {"":""}
            // const ssm_xxx = {"":""}
            // const ssm_x = {"":""}
            
            // let s3Credentials = await authenticateS3(ssm_cert_password_params, ssm_ad_account_params, ssm_ad_xxx_params, ssm_xxx, ssm_x)
            
            var awsS3Credentials = {
                accessKeyId : "AKIA4XFD5MLGZS23DYMX",
                secretAccessKey: "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",
                // sessionToken: SessionToken,
                signatureVersion: 'v4'
                
            };
            
            console.log('Event', event)
            
            var s3 = new AWS(awsS3Credentials);
            
            let preSignedUrl = await accessingS3(s3, event.queryStringParameters.params1);
            
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    fileUploadUrl: preSignedUrl,
                }),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date,Authorization,X-Api-key,X-Amz-Security-Token',
                },
            };
        }catch(err){
            let errors;
            console.log(err);
            errors= {
                statusCode: 200,
                body: JSON.stringify(err),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 
                    'Content-Type, X-Amz-Date,Authorization,X-Api-key,X-Amz-Security-Token',
                },
            };
            return errors
        }
    return response;
};
    
    
    
