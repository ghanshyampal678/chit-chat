const socket = io();

socket.on('message', (msg) => {
  displayMessage(msg);
  scrollBottom();
});

let name;

do {
  name = prompt('Please enter your Name');
} while (!name);

socket.emit('chatUsers', name);

//Show participants list:
let users = document.getElementById('users');

socket.on('showUsers', (names) => {
  let output = `
    ${names.map((name) => `<li>${name}</li>`).join('')}
    `;
  users.innerHTML = output;
});

//Show Current username:
let user = document.getElementById('room-name');
user.innerText = name;

//Send message to server:
const sendBtn = document.querySelector('.button');
sendBtn.addEventListener('click', sendMessage);

function sendMessage(e) {
  let message = document.querySelector('#msg');
  const text = message.value;

  msg = {
    text,
    name,
  };

  socket.emit('chatMessage', msg);
  message.value = '';
  scrollBottom();

  e.preventDefault();
}

function displayMessage(message) {
  const div = document.createElement('div');

  const chatMsg = document.querySelector('.chat-messages');

  div.classList.add('message');

  div.innerHTML = `
  <p class="meta">${message.userName} <span>${message.time}</span></p>
  <p class="text">
   ${message.message}
  </p>
  `;
  chatMsg.appendChild(div);
}

// leave Chat:
const leave = document.getElementById('leave');
leave.addEventListener('click', leaveChat);
function leaveChat(e) {
  socket.emit('disconnection', `${name} has leaved the chat`);
  socket.emit('removeUser', name);
  user.innerText = 'You leaved';
  scrollBottom();
  window.location.reload();
}

const chatMessages = document.querySelector('.chat-messages');

function scrollBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
