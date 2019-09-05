console.log('Client side js is loaded');

const load = (address) => {
    fetch('/weather?address=' + address).then((response) => {
        console.log('response', response);
        response.json().then((data) => {

            if (data.error) {
                messageOne.textContent = data.error;
                return console.log(data.error)
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            console.log(data.forecast);
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;
    console.log(location)
    load(location);
})