var CreateMember = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },

  onNameInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}))
  },
  onEmailInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}))
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit();
  },

  render: function() {
    var errors = this.props.value.errors || {}

    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'ContactForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          className: errors.name && 'ContactForm-error',
          placeholder: 'Name (required)',
          onInput: this.onNameInput,
          value: this.props.value.name,
          ref: 'name',
        }),
        React.createElement('input', {
          type: 'email',
          className: errors.email && 'ContactForm-error',
          placeholder: 'Email (required)',
          onInput: this.onEmailInput,
          value: this.props.value.email,
          noValidate: true,
        }),
        React.createElement('button', {type: 'submit'}, "Add Contact")
      )
    )
  },
})
