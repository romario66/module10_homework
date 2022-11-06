'use strict';

const messageField = document.querySelector('.field');
const chatHistory = document.querySelector('.chat-history');
const sendButton = document.querySelector('.j-btn-send');
const geoButton = document.querySelector('.j-btn-geo');
const webSocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

webSocket.onopen = () => {
    chatHistory.insertAdjacentHTML('afterbegin', '<div class="line"><p class="info-message">WebSocket Open</p></div>')
}

webSocket.onclose = () => {
    chatHistory.insertAdjacentHTML('beforeend', '<div class="line"><p class="info-message">WebSocket Closed</p></div>')
}

webSocket.onmessage = function(e) {
    showMessage(e.data);
}

const showMessage = (text, isMyMessage = false) => {
    if (text) {
        const message = `
        <div class="line">
            <div class="message ${isMyMessage ? 'my-message' : ''}">${text}</div>
        </div>`
        chatHistory.insertAdjacentHTML('beforeend', message);
    }
}

const sendMessage = () => {
    showMessage(messageField.value, true);
    webSocket.send(messageField.value);
    messageField.value = '';
}

sendButton.addEventListener('click', () => {
    sendMessage();
})

messageField.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
})

geoButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            showMessage(`<a href="https://www.openstreetmap.org/#map=11/${pos.coords.latitude}/${pos.coords.longitude}">Моя геолокация</a>`, true)
        })
    }
})