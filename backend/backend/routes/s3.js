const dotenv=require('dotenv');
const aws=require('aws-sdk');
const {randomBytes}=require('crypto');
const express=require("express");
const fs = require('fs');
// import AWS from 'aws-sdk';

// Creating express Router
const router=express.Router()
dotenv.config()
const region = "us-east-1";
const bucketName = "etsy-clone-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:'v4'
})

async function generateUploadURL(req) {
    // const imageName = "random"
    console.log("bosdyyysdgf", req.body)
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = ({
        Bucket: bucketName,
        Key: req.body.fileName,
        Expires: 1000,
        ContentType: req.body.fileType
    })

    return s3.getSignedUrlPromise('putObject', params);
}

router.post("/", async (req, res) => {
    console.log("COminh to uplaod image", req.body)
    const url = await generateUploadURL(req);
    console.log("COminh to uplaod image", url)
    res.send({url})
})

module.exports=router
