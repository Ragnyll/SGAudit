var NewMeetingForm = React.createClass({
  propTypes: {
    duration: React.PropTypes.object.isRequired,
  },

  onDurationInput: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}))
  },

  render: function() {
    var errors = this.props.value.errors || {}

    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'NewMeetingForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          placeholder: 'duration',
          onInput: this.onDurationInput,
          value: this.props.value.duration,
          ref: 'duration',
          id: 'new_duration'
        }),
        React.createElement('button', {type: 'submit'}, "Create")
      )
    )
  },
});
