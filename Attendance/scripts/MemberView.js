
var MembersView = React.createClass({
  propTypes: {
    members: React.PropTypes.array.isRequired,
    newMember: React.PropTypes.object.isRequired,
    onNewMemberChange: React.PropTypes.func.isRequired,
    onNewMemberSubmit: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      React.createElement('div', {className: 'MemberView'},
        React.createElement('h1', {className: 'MemberView-title'}, "Join as New Member"),
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
