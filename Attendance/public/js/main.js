var MEMBER_TEMPLATE = {name: "", email: "", errors: null}

var state = {};

$(document).ready(function () {
    var users_div = $('#users');

    // GET request example -- get list of all members
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/members/',
        dataType:'json',
        success: function(data){
            // data is list of member
            // list out each member in the list
            for(i = 0; i < data.length; i++) {
                users_div.append(data[i]['id'] + ': ' + data[i]['name'] + "<br>")
            }
            // If the data returned has a length of zero
            if (!data.length) {
                users_div.append("No users found.")
            }
        }
    });
});

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(MembersView, Object.assign({}, state, {
      onNewMemberChange: updateNewMember,
      onNewMemberSubmit: submitNewMember,
    })),
    document.getElementById('signup')
  );
}


setState({
  members: [
      //null
  ],
  newMember: Object.assign({}, MEMBER_TEMPLATE),
});

function updateNewMember(member) {
  setState({ newMember: member });
}

function submitNewMember() {
  var member = Object.assign({}, state.newMember, {key: state.members.length + 1, errors: {}});

  var newName = $('#new_name').val()
  var new_default_email = $('#new_default_email').val()
  var new_is_competitor = document.getElementById('new_is_competitor').checked;


  var newUser = {
      //id will auto-increment on create, no need to make one
      name: newName,
      is_competitor: new_is_competitor,
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

  setState(
    Object.keys(member.errors).length === 0
    ? {
        newMember: Object.assign({}, MEMBER_TEMPLATE),
        members: state.members.slice(0).concat(member),
      }
    : { newMember: member }
  )
}
