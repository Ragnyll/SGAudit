$(document).ready(function () {
    var $users = $('#users');

    // GET request example -- get list of all members
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/members/',
        dataType:'json',
        success: function(data){
            // data is list of member
            // list out each member in the list
            for(i = 0; i < data.length; i++) {
                $users.append(data[i]['id'] + ': ' + data[i]['name'] + "<br>")
            }
        }
    });

    var newName = $('#new_name').val()
    var new_default_email = $('#new_default_email').val()

    var newUser = {
        //id: id will auto-increment on create, no need to make one
        name: newName,
        is_competitor: true,
        default_email: new_default_email,
        on_teams: [],
        services_used: []
    }

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/members/',
        dataType:'json',
        data: newUser,
        success: function(data){
            console.log(data)
        }
    });
});
