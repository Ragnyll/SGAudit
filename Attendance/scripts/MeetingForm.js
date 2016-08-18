var NewMemberForm = React.createClass({
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
    e.preventDefault()
    this.props.onSubmit()
  },

  render: function() {
    var errors = this.props.value.errors || {}

    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'NewMemberForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          className: errors.name && 'NewMemberForm-error',
          placeholder: 'Name',
          onInput: this.onNameInput,
          value: this.props.value.name,
          ref: 'name',
          id: 'new_name'
        }),
        React.createElement('input', {
          type: 'email',
          className: errors.email && 'NewMemberForm-error',
          placeholder: 'Email',
          onInput: this.onEmailInput,
          value: this.props.value.email,
          noValidate: true,
          id: 'new_default_email'
        }),
        React.createElement('p', {}, 'Do you plan on competing in MegaMiner?' ),
        React.createElement('input', {
          type: 'checkbox',
          defaultChecked: true,
          onInput: this.onDescriptionInput,
          value: this.props.value.description,
          id: 'new_is_competitor'
        }),
        React.createElement('button', {type: 'submit'}, "Sign Up")
      )
    )
  },
});
