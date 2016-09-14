// attendance.js ---
//
// Filename: attendance.js
// Description:
//
// Author: Jon Simington
// Created: Wed Sep 14 17:30:38 2016 (-0500)

console.log("loaded")

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
    render: function() {
        return (
            <h1>UserLoginView</h1>
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
