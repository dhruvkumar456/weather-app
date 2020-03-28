console.log("hello");

const weatherForm=document.querySelector('form');
const address=document.querySelector('input');
const messageOne=document.querySelector('#content1');
const messageTwo=document.querySelector('#content2');
const messageThree=document.querySelector('#content3');


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(address.value);

    messageOne.textContent='Loading...';
    messageTwo.textContent='';
    messageThree.textContent='';

    fetch('/weather?address='+address.value).then((response)=>{
        response.json().then((data)=>{
           console.log(data);
           if(data.error){
                messageOne.textContent=data.error;
                // messageTwo.textContent='';
                // messageThree.textContent='';
           }
           else{
               messageOne.textContent=data.temperature;
               messageTwo.textContent=data.place;
               messageThree.textContent=data.zone;
           }
        });
    })

    
})