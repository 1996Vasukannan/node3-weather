const exp = require('constants');
const express = require('express');
const path=require("path");
const hbs=require('hbs');
const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");

const app = express()
const port=process.env.PORT || 3000;

const publicDirectoryPath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials")

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"vasu"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"VasuKannan"
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help",
        name:"vasu"
    })
});

app.get('/help/*',(req,res)=>{
    res.render('help-404',{
        title:"Help Arcticle not Found",
    })
});

app.get('/weather', (req, res) => {
    const address=req.query.address;
    if(!address){
        return res.send({
            ErrorMeassage: "Please enter Address to find out Weather"
        })
    }

    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({
                ErrorMessage:error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    ErrorMessage:error
                })
            }
            const {forecast,location}=forecastData
            res.send(
                {
                    forecast,
                    location,
                    address:req.query.address
                }
            )
        })
    })
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"You enter Search Object"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res)=>{
    res.render('404-page',{
        title:"Error 404 Page not found",
        
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+".")
})