// attendance.js ---
//
// Filename: attendance.js
// Description:
//
// Author: Jon Simington
// Created: Wed Sep 14 17:30:38 2016 (-0500)

var destination = document.querySelector("#content");
var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

var App = React.createClass({
    render: function() {
        return (
            <div>
              {this.props.children}
            </div>
        )
    }
})

// 'Home' View -- What user sees before any interaction
var HomeView = React.createClass({
    render: function() {
        return (
            <div>
              <Link to="/login">
                <a className="waves-effect waves-light btn-large"><i className="material-icons left">vpn_key</i>LOG IN</a>
              </Link>

              <div className="muted">
                <br />
                OR
                <br />
                <br />
              </div>

              <Link to="/register">
                <a className="waves-effect waves-light btn-large"><i className="fa fa-user-plus">&nbsp;&nbsp;</i>REGISTER WITH SIG-GAME</a>
              </Link>
            </div>
        )
    }
});


// 'Login' View -- list of all users registered; user selects their name
var UserLoginView = React.createClass({
    componentWillMount() {
        var result = {}
        fetchFromAPI("/members/").then(function(members) {
            var table = document.getElementById('users-table');

            // Loop over every member that got returned
            for (var i = 0; i < members.length; i++) {
                // need to insert at index + 1, since index 0 is the header
                var row = table.insertRow(i + 1);
                var presentCell = row.insertCell(0)
                var nameCell = row.insertCell(1);
                var competitorCell = row.insertCell(2);
                var teamsCell = row.insertCell(3);


                presentCell.innerHTML = "<a href='/mark-present/" + members[i]['id'] + "' class='waves-effect waves-light btn-large green'><span class='fa fa-check'><span></a>&nbsp;<a href='/mark-absent/" + members[i]['id'] + "' class='waves-effect waves-light btn-large red'><span class='fa fa-times'><span></a>"

                nameCell.innerHTML = members[i]['name']

                if (members[i]['is_competitor']) {
                    competitorCell.innerHTML = "<span class='fa fa-check'></span>"
                }
                else {
                    competitorCell.innerHTML = "<span class='fa fa-times'></span>"
                }

                // List all teams the user is on
                for (var j = 0; j < members[i]['on_teams'].length; j ++) {
                    teamsCell.innerHTML += "<span class='chip'>" + members[i]['on_teams'][j] + "</span>"
                }
            }
        })
    },
    render: function() {
        return (
                <div>
                  <h3>Find Your Name Below:</h3>
                  <hr />
                  <table id="users-table" className="striped">
                    <thead id="users-thead">
                      <tr id="users-thead-row">
                        <th data-field="mark-attendance">Present?</th>
                        <th data-field="name">Name</th>
                        <th data-field="competitor">Is Competitor</th>
                        <th data-field="teams">On Teams</th>
                      </tr>
                    </thead>
                    <tbody id="users-tbody">
                    </tbody>
                  </table>
                </div>
        )
    }
})

// User Detail View -- specifics about the user
var UserDetailView = React.createClass({
    render: function() {
        return (
            <h1>UserDetailView</h1>
        )
    }
})

// 'Register' View -- takes in information about the user
var UserRegisterView = React.createClass({
    render: function() {
        return (
            <h1>UserRegisterView</h1>
        )
    }
})

// React Router logic
ReactDOM.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={UserLoginView} />
        <Route path="detail" component={UserDetailView} />
        <Route path="register" component={UserRegisterView} />
      </Route>
    </Router>,
    destination
);

// Returns the value of the cookie with name `cname`
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

// Pings /token and either gets the existing auth token, or fetches a new one
function getAuthToken() {
    return new Promise(function(resolve, reject) {
        var token = '';

        // If the cookie is not undefined, 'undefined', it exists, so
        if (getCookie('AUTH_TOKEN') != 'undefined' &&
            getCookie('AUTH_TOKEN') != undefined) {
            console.log("Found AUTH_TOKEN cookie, not getting a new one")
            token = getCookie('AUTH_TOKEN')
            console.log("COOKIE: " + token)
        }
        // Otherwise, the cookie doesn't exist, so we must fetch a new token
        else {
            console.log("Didn't find AUTH_TOKEN cookie, fetching new one")
            $.ajax({
                type: "GET",
                url: "http://localhost:8001/token",
                dataType: 'json',
                async: true
                // got the token back, so update the variable for return
            }).done(function(data) {
                token = data
                console.log("TOKEN:  " + token)
            });
        }
        resolve(token)
    })
}

// Fetches from the Auditor API at a specified endpoint, and resolves the results
function fetchFromAPI(endpoint) {
    return new Promise(function(resolve, reject) {
        console.log("Attempting to fetch from " + endpoint)

        getAuthToken().then(function(token) {
            // fetch from api now using the second cURL
            // curl -H "Authorization: Bearer <aut_token>" http://localhost:8000/members/ > error.html
            console.log("Got token...")
            var result = {}
            $.ajax({
                type: "GET",
                url: 'http://simington.io' + endpoint,
                dataType: 'json',
                async: true,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", 'Bearer ' + token)
                }
            }).done(function(data) {
                console.log("GOT BACK THE FOLLOWING FROM " + endpoint)
                console.log(data)
                result = data
                resolve(result)
            })
        });
    });
}
