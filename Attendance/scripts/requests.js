$(document).ready(function () {
    var $users = $('#users');

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8000/members/?json',
        dataType:'json',
        success: function(data){
            usersResponse = data;
            console.log(usersResponse);
        }
    });
});
