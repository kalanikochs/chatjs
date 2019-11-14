jQuery(function($) {
const socket = io();

//getting DOM elements from UI
const $messageForm = $('#message-form');
const $messageBox = $('#message');
const $chat = $('#chat');
const $users = $('#users');
const $userList = $('.user-list');

//getting DOM for nickname form

const $nickform = $('#nickForm');
const $nickname = $('#nickname_field');
const $nk_$messages = $('.nk-message');

//events

$nickform.submit(e => {
    e.preventDefault();
    socket.emit('new-user', $nickname.val(), data => {
        if(data) {
            $('#NickWrap').hide();
            $('#contentWrap').show();
        } else {
            $nk_$messages.html(`
            <div class="notification is-danger">
            The username is already taken!
            </div>`);
            $nickname.val('');
        }
    })
})

$messageForm.submit(e => {
    e.preventDefault();
    socket.emit('send-message', $messageBox.val(), data => {
        $chat.append(`
        <div class="notification is-danger">
        ${data}
        </div>`);
    });
    $messageBox.val('');
})

socket.on('new-message', data => {
    $chat.append('<div class="n-message animated bounceIn"><b>'+data.nick+'</b>: ' + data.msg + '</div>');
})

socket.on('usernames', data => {
    let dom = '';
    for(let i = 0; i < data.length; i++) {
        dom += `<li><i class="fas fa-user"></i> ${data[i]}</li>`;
    }
    $userList.html(dom);
})

socket.on('whisper', data => {
    $chat.append(`<div class="private" style="color:grey;"><b>${data.nick}:</b> ${data.msg}</div>`);
})

socket.on('load-old-msgs', msgs => {
    for(let i = 0; i < msgs.length; i++) {
        displayMsg(msgs[i]);
    }
})

function displayMsg(data) {
    $chat.append('<div class="n-message"><b>'+data.nick+'</b>: ' + data.msg + '</div>');
}

$('textarea#message').focus();

});