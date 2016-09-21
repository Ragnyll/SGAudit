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
      Link,
      History } = ReactRouter;


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
              <a href='#/login' className="waves-effect waves-light btn-large"><i className="material-icons left">vpn_key</i>LOG IN</a>

              <div className="muted">
                <br />
                OR
                <br />
                <br />
              </div>

              <a href='#/register' className="waves-effect waves-light btn-large"><i className="fa fa-user-plus">&nbsp;&nbsp;</i>REGISTER WITH SIG-GAME</a>
            </div>
        )
    }
});


// 'Login' View -- list of all users registered; user selects their name
var UserLoginView = React.createClass({
    mixins: [History],
    componentWillMount() {
        var result = {}
        fetchFromAPI("/members/", "GET").then(function(members) {
            var user_list_div = $('#user-list')

            // for each member in the list the API returned, create a new card
            // with data about the user
            for (var i = 0; i < members.length; i++) {
                // first, append a div to the #users-list div with id #user-<i>
                //user_list_div.append("<div id='user-" + (i + 1) + "'></div>")
                user_list_div.append("<div class='card row' id='user-" + (i + 1) + "' ></div>")
                var current_user = $('#user-' + (i + 1))

                // mark present buttons
                current_user.append("<div class='col s3'><a href='/mark-present/" + members[i]['id'] + "' class='waves-effect waves-light btn-large green'><span class='fa fa-check'><span></a>&nbsp;<a href='/mark-absent/" + members[i]['id'] + "' class='waves-effect waves-light btn-large red'><span class='fa fa-times'><span></a></div>")

                // user's name
                current_user.append("<div class='col s3'>" + members[i]['name'] + "</div>")

                // competitor status
                if (members[i]['is_competitor']) {
                    current_user.append("<div class='col s3'><span class='fa fa-check'></span></div>")

                }
                else {
                    current_user.append("<div class='col s3'><span class='fa fa-times'></span></div>")

                }

                // user's teams
                // append initial div
                current_user.append("<div class='col s3' id='user-teams-" + (i + 1) + "'></div>")

                console.log(members[i])

                for (var j = 0; j < members[i]['on_teams'].length; j++) {
                    $('#user-teams-' + (i + 1)).append("<div class='chip'>" + members[i]['on_teams'][j] + "</div>")
                }
            }


        })
    },
    render: function() {
        return (
                <div>
                  <a className="waves-effect waves-light btn-large" onClick={this.history.goBack}>GO BACK</a>
                  <h3>Find Your Name Below:</h3>

                  <div id="users-header" className="card row">
                    <div className="col s3">
                      Present?
                    </div>
                    <div className="col s3">
                      Name
                    </div>
                    <div className="col s3">
                      Is Competitor
                    </div>
                    <div className="col s3">
                      On Teams
                    </div>
                  </div>
                  <div id="user-list"></div>
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
    mixins: [History],
    componentWillMount() {
        console.log("TRYNA REGISTER")
    },
    render: function() {
        return (
                <div>
                  <a className="waves-effect waves-light btn-large"
                    onClick={this.history.goBack}>GO BACK
                  </a>
                  <h1>Hey, Welcome to SIG-Game!</h1>
                  <h5>In order to get you in our system, we need a bit of
                    information from you:
                  </h5>
                  <br />
                  <br />
                  <div className="row card">
                    <form className="col s12">
                      <div className="row">
                        <div className="input-field col s4 m2">
                          <input id="first_name" type="text" className="validate" />
                          <label >First Name</label>
                        </div>
                        <div className="input-field col s4 m2">
                          <input id="last_name" type="text" className="validate" />
                          <label >Last Name</label>
                        </div>
                        <div className="input-field col s4 m3">
                          <input id="email" type="email" className="validate" />
                          <label >Email Address</label>
                        </div>
                        <div className="input-field col s6 m3">
                          <input id="competing" type="checkbox" className="filled-in" />
                          <label htmlFor="competing">Planning on Competing
                            in MegaMinerAI?
                          </label>
                        </div>

                      <div className="input-field col s6 m2">
                        PUT TEAM SELECTOR HERE
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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

        var current_cookie_token = getCookie('AUTH_TOKEN')

        // cookie is not undefined, so it must exist, and we dont need to fetch
        // a new token
        if (current_cookie_token != undefined &&
            current_cookie_token != 'undefined') {
            console.log("Found AUTH_TOKEN cookie, not getting a new one");
            token = current_cookie_token;
            console.log("COOKIE: " + token);
            resolve(token);
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
                token = data;
                console.log("TOKEN:  " + token);
                resolve(token);
            });
        }

    })
}

// Fetches from the Auditor API at a specified endpoint, and resolves the
// results
function fetchFromAPI(endpoint, method) {
    return new Promise(function(resolve, reject) {
        console.log("Attempting to fetch from " + endpoint)

        getAuthToken().then(function(token) {
            console.log("Got token...")

            var result = {}

            // We have our auth token, so we need to now use that token to
            // authenticate and access the auditor API to get back the results
            // we asked for at endpoint with method
            $.ajax({
                type: method,
                url: 'http://simington.io' + endpoint,
                dataType: 'json',
                async: true,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization",
                                             'Bearer ' + token)
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
