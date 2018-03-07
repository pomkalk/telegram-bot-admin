$(()=>{
    var socket = io();


    $('#modal-window').modal({
        centered: false,
        onApprove: () => {
            var msg = $('#message-box').val();
            socket.emit('broadcast', {message: msg});
        }
    });
    $('#show-modal').click(()=>{
        $('#modal-window').modal('show');
    });
    
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
    
    socket.on('log', (data)=>{
        console.log(data);
        var list = $('#log');
        var item = $('<div>').addClass('item');
        var icon = $('<i>').addClass('minus icon');
        var content = $('<div>').addClass('content');
        var header = $('<div>').addClass('header').html('from: '+data.from);
        var desc = $('<div>').addClass('description').html(data.msg);
        item.append(icon).append(content);
        content.append(header).append(desc);
        list.append(item);
    });
});
