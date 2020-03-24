//LOCATION=>Longitude,latitude.
const request=require('request');
const geocoding=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoicG9zaGFrIiwiYSI6ImNrN3NuY2p4ejBudzUzbnFkY3RuMHB4eGoifQ.jVVMUBpWfUCKlW3GQDHrQQ';
    request({ url, json:true},(error,{body}={})=>{
        if(error){
            callback('Please check your internet connectivity..!',undefined);
        }
        else if(body.features.length===0){
            callback('Place not found.Search for another place.',undefined);
        }else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                place:body.features[0].place_name
            });
        }
    }) 
}

//DATA IS PRINTED IN THIS CALLBACK FUNCTION SO FOR EACH REQUEST WE CAN PRINT DATA AS PER OUR CHOICE..
/*
geocoding('Ambala cantt',(error,response)=>{
    console.log('Error:',error);
    console.log('Data:',response);
})*/




//IN THIS METHOD WE HAVE TO WRITE THIS CODE MULTIPLE TIMES..FOR MULTIPLE REQUEST.

// const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/hamirpur.json?access_token=pk.eyJ1IjoicG9zaGFrIiwiYSI6ImNrN3NuY2p4ejBudzUzbnFkY3RuMHB4eGoifQ.jVVMUBpWfUCKlW3GQDHrQQ';
// request({ url:url2,json:true },(error,response)=>{
//     if(error){
//         console.log("Unable to connect to location services..");
//     }
//     else if(response.body.features.length===0){
//         console.log(chalk.red.inverse("Undefined location.Please try another location."));
//     }
//     else{
//         console.log(response.body.features[0].place_name);
//         console.log(response.body.features[0].center);
//     } 
// });

module.exports={
    geocoding:geocoding,
}