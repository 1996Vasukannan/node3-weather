const WeatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

WeatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    messageOne.textContent='loading...';

    fetch("/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        messageOne.textContent='';
        console.log(data);
        if(data.ErrorMessage){
            messageOne.textContent="Error: "+data.ErrorMessage;
        }
        else{
            messageTwo.textContent=data.forecast +" climate at "+ data.location +", "+data.address;
        }
    })
})
})