const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
require('dotenv').config()
let config = {
  "region":"us-east-2",
  "accessKeyId": process.env.ACCESS_KEY_ID,
  "secretAccessKey": process.env.SECRET_ACCESS_KEY,
}
aws.config.update(config)
const dynamodb = new aws.DynamoDB.DocumentClient({
  endpoint:"http://dynamodb.us-east-2.amazonaws.com",
})

/* 
    request body
    {
        deleteItems: [sp1,sp2,sp3]
    }
    nguyenthanhlong1375@gmail.com
*/
router.delete('/', (req, res) => {
    let deleteItems = req.body.deleteItems;
    console.log(req.body)
    deleteItems.forEach(item => {
        let param = {
            TableName:"sanphamgiuaky",
            Key : {
                masanpham: item
            }
        }
        dynamodb.delete(param,(err,data) => {
            if(err) res.json(err);
            else res.json ({
                msg:"delete completed successfully"
            })
        })
    });
})
module.exports = router