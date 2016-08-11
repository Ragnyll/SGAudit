
var MembersView = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired,
    newMember: React.PropTypes.object.isRequired,
    onNewMemberChange: React.PropTypes.func.isRequired,
    onNewMemberSubmit: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', {className: 'MeetingView'},
        React.createElement('h1', {className: 'MeetingView-title'}, "Create New Meeting"),
        React.createElement('ul', {className: 'MemberView-list'},
          this.props.members.map(function(member) {
            return React.createElement(MemberItem, member)
          })),
        React.createElement(NewMemberForm, {
          value: this.props.newMember,
          onChange: this.props.onNewMemberChange,
          onSubmit: this.props.onNewMemberSubmit,
        })
      )
    )
  },
});
