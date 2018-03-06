var socket = io();

socket.on('users update', (users)=>{
    var list = $('#users-list');
    list.html('');
    users.forEach(user => {
        var item = $('<div>').addClass('item');
        var header = $('<div>').addClass('header').html(user.first_name + ' ' + user.last_name);
        item.append(header);
        item.append(user.username);
        list.append(item);
    });
});