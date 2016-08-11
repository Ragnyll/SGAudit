
var MeetingsView = React.createClass({
  propTypes: {
    meetings: React.PropTypes.array.isRequired,
    newMeeting: React.PropTypes.object.isRequired,
    onNewMeetingChange: React.PropTypes.func.isRequired,
    onNewMeetingSubmit: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', {className: 'MeetingView'},
        React.createElement('h1', {className: 'MeetingView-title'}, "Create New Meeting"),
        React.createElement(NewMeetingForm, {
          value: this.props.newMeeting,
          onChange: this.props.onNewMeetingChange,
          onSubmit: this.props.onNewMeetingSubmit,
        })
      )
    )
  },
});
