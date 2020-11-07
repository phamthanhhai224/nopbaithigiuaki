var express = require('express');
var router = express.Router();
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

router.get('/:masanpham', function(req, res) {
  let params = {
    TableName: "sanphamgiuaky",
    Key: {
      masanpham: req.params.masanpham
    }
  }
  dynamodb.delete(params, (err, data) => {
    if(err) console.log(err)
    else{
      console.log('xoa thanh cong')
      res.redirect('../');
    }
  })
});

module.exports = router;
