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

    // PUT request example -- create new member
    // TODO: authentication thru DRF

    var newName = $('#new_name').val()

    var testUser = {
        //id: id will auto-increment on create, no need to make one
        name: newName,
        is_competitor: true,
        default_email: 'jon@jon.jon',
        on_teams: [],
        services_used: []
    }

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/members/',
        dataType:'json',
        data: testUser,
        success: function(data){
            console.log(data)
        }
    });
});
