var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();
const multer = require('multer');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));

const upLoadSchema = new mongoose.Schema({
  file: {type: String, required:true}
});

const upload = multer({dest: 'public/uploads'}); // multer - dependeci for uploads

app.post('/api/fileanalyse', upload.single('upfile'), (req, res)=>{
  let file = req.file;
  if(!file){
    return res.status(400).json({error: 'No file uploaded'});
  }
  return res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
});
})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
