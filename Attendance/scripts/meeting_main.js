var MEETING_TEMPLATE = {duration: "", errors: null}

var state = {};

$(document).ready(function () {
    var $meetings = $('#meetings');

    // GET request example -- get list of all meetings
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/meetings/',
        dataType:'json',
        success: function(data){
            // data is list of meetings
            // list out each meeting in the list
            for(i = 0; i < data.length; i++) {
                $meetings.append(data[i]['id'] + ': ' + data[i]['date'] + "<br>")
            }
        }
    });
});

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(MeetingsView, Object.assign({}, state, {
      onNewMeetingChange: updateNewMeeting,
      onNewMeetingSubmit: submitNewMeeting,
    })),
    document.getElementById('signup')
  );
}


setState({
  meetings: [
      //null
  ],
  newMeeting: Object.assign({}, MEETING_TEMPLATE),
});

function updateNewMeeting(meeting) {
  setState({ newMeeting: meeting });
}

function submitNewMeeting() {
  var newMeeting = Object.assign({}, state.newMeeting, {key: state.meetings.length + 1, errors: {}});

  var new_duration = $('#new_duration').val();


  var newMeeting = {
      //id will auto-increment on create, no need to make one
      duration: new_duration,
  }

  $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/meetings/',
      dataType:'json',
      data: newMeeting,
      success: function(data){
          console.log(data)
      }
  });

  setState(
    Object.keys(meeting.errors).length === 0
    ? {
        newMeeting: Object.assign({}, MEETING_TEMPLATE),
        meetings: state.meetings.slice(0).concat(meeting),
      }
    : { newMeeting: meeting }
  )
}
