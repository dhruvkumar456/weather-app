const request=require('request');

//Longitude,latitude=>wheather information.
const forecast=(center,callback)=>{
    const url='https://api.darksky.net/forecast/9fc09672e7e6f663d9145b361753d110/'+center+'?units=si';
    request({url, json:true},(error,{body}={})=>{     //this command is used to fetch data from api endpoint(json data)
        if(error){
            callback('Please check your internet connectivity..',undefined);
        }
        else if(body.error){
            callback('Check your Location Coordinates..',undefined);
        }
        else{
            callback(undefined,{
                temperature:body.currently.temperature,
                zone:body.timezone
            });
        } 
    })
}

/*
forecast('37.8267,122.4233',(error,response)=>{
    console.log('Error:',error);
    console.log('Data:',response);
})*/



// const url1='https://api.darksky.net/forecast/9fc09672e7e6f663d9145b361753d110/30.3610,122?units=si'

// request({url:url1,json:true},(error,response)=>{
//     if(error){
//         console.log("Unable to connect to wheather services..!");
//     }
//     else if(response.body.error){
//         console.log(chalk.blue.inverse("Undefined location coordinates.."));
//     }
//     else{
//         console.log("Current temprature of "+response.body.timezone+" is "+ response.body.currently.temperature+".");
//         console.log("Probability of raining is "+ response.body.currently.precipProbability+" percent.");
//     }
// });


module.exports={
    forecast:forecast,
}
