const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000 ;
var app = express();


hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine' , 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) =>{
    var now = new Date().toString(),
    log = (`${now} : ${req.method} ${req.url}`);
    
    fs.appendFile('server.log' , log + '\n' , (err) =>{
        if(err)
        {
            console.log('Unable to append file server.log');
        }
    });
    next();
});

// app.use((req,res,next) =>{
//     res.render('maintaince.hbs');
//     next();
// });

hbs.registerHelper('getCurrentDate' , () => new Date().getFullYear());
hbs.registerHelper('screamIt',text => text.toUpperCase());

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        name:'Mostafa Badr',
        page_title:'Home Page'
    });
});

app.get('/about', (req,res) =>{
    res.render('about.hbs',{
        page_title:'About Page'
    });
});

app.get('/bad' , (req,res) => {
    
    res.send({
        err_msg:'Unable to get to the page you request' 
    });
    
});


app.listen(port , () => {
    console.log(`Server is on port ${port}`);
});   