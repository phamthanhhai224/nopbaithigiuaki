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
/* GET home page. */
router.get('/', function(req, res) {
  let param = { 
    TableName: "sanphamgiuaky"
  }

  dynamodb.scan(param, function(err, data) {
    if(err) console.log(err)
    else {
      res.render('index',{allSanPham : data.Items})
    }
  })
});

module.exports = router;
