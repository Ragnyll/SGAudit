var MeetingItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  },

  render: function() {
    return (
      React.createElement('div', {className: 'MeetingItem'},
        React.createElement('div', {className: 'MeetingItem-duration'}, this.props.duration),
        React.createElement('div', {className: 'MeetingItem-email'}, this.props.email),
        React.createElement('div', {className: 'MeetingItem-description'}, this.props.description)
      )
    )
  },
});
