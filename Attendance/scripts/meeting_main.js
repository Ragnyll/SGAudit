var MEMBER_TEMPLATE = {name: "", email: "", errors: null}

var state = {};

$(document).ready(function () {
    var $users = $('#users');

    // GET request example -- get list of all meetings
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/meetings/',
        dataType:'json',
        success: function(data){
            // data is list of meeting
            // list out each meeting in the list
            for(i = 0; i < data.length; i++) {
                $users.append(data[i]['id'] + ': ' + data[i]['name'] + "<br>")
            }
        }
    });
});

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(MeetingView, Object.assign({}, state, {
      onNewMeetingChange: updateNewMeeting,
      onNewMeetingSubmit: submitNewMeeting,
    })),
    document.getElementById('MeetingView')
  );
}


setState({
  meetings: [
      //null
  ],
  newMeeting: Object.assign({}, MEMBER_TEMPLATE),
});

function updateNewMeeting(meeting) {
  setState({ newMeeting: meeting });
}

function submitNewMeeting() {
  var meeting = Object.assign({}, state.newMeeting, {key: state.meetings.length + 1, errors: {}});

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
      url: 'http://127.0.0.1:8000/meetings/',
      dataType:'json',
      data: newUser,
      success: function(data){
          console.log(data)
      }
  });

  setState(
    Object.keys(meeting.errors).length === 0
    ? {
        newMeeting: Object.assign({}, MEMBER_TEMPLATE),
        meetings: state.meetings.slice(0).concat(meeting),
      }
    : { newMeeting: meeting }
  )
}
