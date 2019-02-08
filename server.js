//Require and instantiate assets
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
var upload = multer({dest: 'uploads/'}); //instantiate instance of multer
const app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

//bootleg way of getting redirect, works only for a single page
//app.get('/', (req, res, next) => {
//    res.sendFile(__dirname + '/public/index.html')
//});
//better way is to: it applies to all pages
app.use(express.static(__dirname + '/public'));

//multer is saying get a single file
app.post('/upload', upload.single('file'), (req, res, next) => {
    let fileName = req.file.originalname;
    let type = req.file.mimetype;
    let size = req.file.size;
    let output = {
        name: fileName,
        type: type,
        size: size
    };
    return res.json(output);
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
  