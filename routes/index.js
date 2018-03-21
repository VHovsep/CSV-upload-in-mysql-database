const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const util = require('util');
const fsExtra   = require('fs.extra');
const fs = require('fs');
const cm = require('csv-mysql');
const Options = require('../moduls/db.conf');
const mysql = require('mysql');
const con = mysql.createConnection(Options.DB_CONFIG);
con.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('connected!!!');
    }
});
let form = new formidable.IncomingForm();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',(req,res)=>{
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        form.on('end', function(fields, files) {
            let temp_path = this.openedFiles[0].path;
            let file_name = this.openedFiles[0].name;
            let new_location = 'C:/Users/hovse/Desktop/StockCode/public/upload/';
            fsExtra.copy(temp_path, new_location + file_name, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("success!");
                    fs.readFile(new_location + file_name, 'utf8', function(err, contents) {
                        let options = Options.OPTIONS;
                        con.query("TRUNCATE test_geo",(err)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("truncate okay!!!");
                            }
                        });
                        cm.import(options, contents, function(err, rows){
                            if( err===null )err = false;
                            console.log(rows);
                            fs.unlinkSync(new_location + file_name);
                        });
                    });
                }
            });
        });
        form.parse(req, function(err, fields, files) {
            if(err)
                console.log(err);
            res.end(util.inspect('okay'));
        });
    }
});

router.post("/okay",(req,res)=> {
    let data = '"name_1","name_2","name_3"\n"1","2","3"\n"4","5","6"';
    let options = {
        mysql: {
            host: 'localhost',
            user: 'root',
            password : 'hovsephos',
            database: 'geo',
        },
        csv: {
            comment: '#',
            quote: '"'
        },
        table: 'test_geo'
    };

    cm.import(options, data, function(err, rows){
        if( err===null )err = false;
        console.log(rows);
    });
});

module.exports = router;
