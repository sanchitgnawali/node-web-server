const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

//Handlebar
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine','hbs');

//regestering helpers
hbs.registerHelper('getYear',()=>{
    return new Date().getFullYear();
});

//regestering helpers
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    res.render('maintainance.hbs');
});

app.use(express.static(__dirname+'/public'));

//middleware
app.use((req,res,next)=>{
    const now = new Date();
    var log = `${now} ${req.method} ${req.url}`;

    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err) {
            console.log('unable to append log file');
        }
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintainance.hbs');
});

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        title: 'Home Page',
        welcomeMessage: 'welcome to my website'
    });
});


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title: 'About Page - Anyn',
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to find that page'
    });
})



console.log('server is starting');
app.listen(port,()=>{
    console.log(`Server is up and ruiing on port ${port}`);
});


