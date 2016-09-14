var MemberItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  },

  render: function() {
    return (
      React.createElement('div', {className: 'MemberItem'},
        React.createElement('div', {className: 'MemberItem-name'}, this.props.name),
        React.createElement('div', {className: 'MemberItem-email'}, this.props.email),
        React.createElement('div', {className: 'MemberItem-description'}, this.props.description)
      )
    )
  },
});
