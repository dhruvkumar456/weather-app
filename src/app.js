const path=require('path');
const express=require('express');
const app=express();
const hbs=require('hbs');
const geocoding=require('./utils/geocoding');
const forecast=require('./utils/forecast');

// TO SET PATH CONFIGURATION OF EXPRESS..
const PublicPath=path.join(__dirname,'../public');
const viewspath=path.join(__dirname,'../template/views');
const PartialPath=path.join(__dirname,'../template/partials');

//SET CONFIGURATION FOR DYNAMIC PAGES..
app.set('view engine', 'hbs');
app.set('views',viewspath)


//STATIC PAGE DIRECTORY..
app.use(express.static(PublicPath));

//PARTIAL PAGE DIRECTORY..
hbs.registerPartials(PartialPath);

app.get('',(req,res)=>{
    // res.send('Wheather app')
    res.render('index',{
        title:'Weather forecast API',
        link:'https://github.com/dhruvkumar456'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        contact:'8053358xxx',
        link:'https://github.com/dhruvkumar456'
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        link:'https://github.com/dhruvkumar456'
    })
})

//WHEATHER-APP PAGE
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Provide address query with URL.'
        })
    }

    geocoding.geocoding(req.query.address,(error,{longitude,latitude,place}={})=>{
        if(error){
            return res.send({error});
        }

        forecast.forecast(latitude+','+longitude,(error,{temperature,zone})=>{
            if(error){
                return res.send({error}); 
            }
            res.send({
                temperature:temperature,
                place:place,
                zone:zone
            });
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help page doesnot found..',
        link:'https://github.com/dhruvkumar456'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page Not Found..',
        link:'https://github.com/dhruvkumar456'
    })
})

const portno=2000;
app.listen(portno,()=>{
    console.log('Server is running on port '+portno+'.');
});