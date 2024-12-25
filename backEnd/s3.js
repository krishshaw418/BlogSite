const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
require('dotenv').config({path:`../.env`});
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,  
})

function uploadFile(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileStream,
    }
    return s3.upload(uploadParams).promise();
}

function getFile(key){
    const downloadParams = {
        Key: key,
        Bucket: bucketName,
    }
    return s3.getObject(downloadParams).createReadStream();
}

module.exports = {uploadFile, getFile};