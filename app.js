const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());


let Employee = require('./models/employee');
//DB Connection
mongoose.connect('mongodb://localhost/myapp');
let db = mongoose.connection;
//Check Connection
db.once('open',function(){
    console.log('Connected to Mongo DB');
})

//Check db Errors
db.on('error',function(err){
    console.log(err);
});


//Set views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Handling Static files
app.use(express.static(path.join(__dirname,'public')));


//Ana Sayfa
app.get('/',function(req,res){
    Employee.find({},function(err,emp){
        if(err){
            console.log(err);
        }
        else{
            res.render('layout',{
                emp:emp
            });
        }
    });
});

//Personel ekleme sayfasını gösterme
app.get('/add',function(req,res){
    res.render('add');
});

//Çalışan Ekleme Sayfası
app.post('/add',urlEncodedParser,function(req,res){
    let employee = new Employee();
    employee.name = req.body.name;
    employee.surname = req.body.surname;
    employee.job = req.body.job;
    employee.salary = req.body.salary;

    employee.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

// Güncelleme Sayfasını 
app.get('/update',function(req,res){
    Employee.find({},function(err,emp){
        if(err){
            console.log(err);
        }
        else{
            res.render('update',{
                emp:emp
            });
        }
    });
    
});

//Güncellemeyi gerceklestirme
app.get('/update/edit/:id',function(req,res){
    Employee.findById(req.params.id,function(err,emp){
        if(err){
            console.log(err);
        }
        else{
            res.render('edit',{
                emp:emp
            });
        }
    });
});

//Kaydı degistirme
app.post('/update/edit/:id',urlEncodedParser,function(req,res){
    let employee = {};
    employee.name = req.body.name;
    employee.username = req.body.username;
    employee.job = req.body.job;
    employee.salary = req.body.salary;

    let query = {_id:req.params.id};
    Employee.update(query,employee,function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    });
});





//Kayıt silme sayfası
app.get('/remove',function(req,res){
    Employee.find({},function(err,emp){
        if(err){
            console.log(err);
        }
        else{
        res.render('remove',{
            emp:emp
        });
    }
    });
});

//Kaydı silme
app.delete('/remove/:id',function(req,res){
    let query = {_id:req.params.id};
    Employee.deleteOne(query,function(err){
        if(err){
            console.log(err);
        }
        else{
            res.send();
        }
    });
});



//Creating Server
app.listen(port,function(){
    console.log(`App is running on port : ${port}`);
});