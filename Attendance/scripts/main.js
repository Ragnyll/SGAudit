var MEMBER_TEMPLATE = {name: "", email: "", errors: null}

var state = {};


var $users = $('#users');

// GET request example -- get list of all members
$.ajax({
    type: 'GET',
    url: 'http://localhost:8000/members/',
    dataType:'json',
    success: function(data){
        // data is list of member
        // list out each member in the list
        for(i = 0; i < data.length; i++) {
            $users.append(data[i]['id'] + ': ' + data[i]['name'] + "<br>")
        }
    }
});

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(ContactsView, Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact,
    })),
    document.getElementById('signup')
  );
}



          // THIS WILL ONLY BE USED FOR DEBUGGING PURPOSES

          // Set initial data
          setState({
            contacts: [
              //null
            ],
            newContact: Object.assign({}, MEMBER_TEMPLATE),
          });



          /*
           * Actions
           */


          function updateNewContact(contact) {
            setState({ newContact: contact });
          }


function submitNewContact() {
  var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});

  var newName = $('#new_name').val()
  var new_default_email = $('#new_default_email').val()

  var newUser = {
      //id: id will auto-increment on create, no need to make one
      name: newName,
      is_competitor: true,
      default_email: new_default_email,
      on_teams: [],
      services_used: []
  }

  $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/members/',
      dataType:'json',
      data: newUser,
      success: function(data){
          console.log(data)
      }
  });

  setState(
    Object.keys(contact.errors).length === 0
    ? {
        newContact: Object.assign({}, MEMBER_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact),
      }
    : { newContact: contact }
  )
}
