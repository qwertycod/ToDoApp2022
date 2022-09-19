import './App.css';
import ListAll from './components/ListAll'
import ToDoContainer from './components/ToDoContainer'
import HooksToDoContainer from './components/HooksToDoContainer'
import {Provider } from 'react-redux'
import store from './redux/store'
import UserContainer from './components/UserContainer';
import Dashboard from './components/Dashboard'; 
import { createStore } from 'redux';
import Timings from './components/Timings';
import {BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom'

import { Component } from 'react';  
import Loader from 'react-loader-spinner';
const Route = require("react-router-dom").Route;

const testFunctionalComp = ({match}) => {
  return <h1>Test func comp {match.params.word}</h1>
}
const activeLinkStyle = {color:'green'}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'peter'
    }
  }

  componentDidMount() {
    document.getElementsByClassName('overlay')[0].classList.remove('overlay');
   document.querySelectorAll("#loaderComponent")[0].hidden = true;
   document.getElementById('app-main-container').style.height =  '' +  window.innerHeight  + 'px'
  }
   state = {
      loggedin: false,
      name : 'john'
    }
    
 handleLogin = () => {
  console.log(' #### test #### before', this.state.loggedin)
    this.setState((prevState) => ({
      loggedin : !prevState.loggedin
      }
    ))
    console.log(' #### test #### after', this.state.loggedin)
  }

  render() {
  return (
    <Router>
        <Provider store={store}>
        <div className="App">
          <div id="loaderComponent">
            <Loader type="Circles" className="loader" color="#00BFFF"/>
            </div>
            <div id="app-main-container"  className="overlay wall">
            <div >
            {/* <ul>
              <li>
                <NavLink to="/" activeStyle={activeLinkStyle} exact>Home</NavLink>
              </li>
              <li>
                <NavLink to="/ToDoContainer" activeStyle={activeLinkStyle} exact>ToDoContainer</NavLink>
              </li>
              <li>
              <NavLink to="/timings/zzzz" activeStyle={activeLinkStyle}>Timings</NavLink>
              </li>
              <li>
              <NavLink to="/HooksToDoContainer" activeStyle={activeLinkStyle}>HooksToDoContainer</NavLink>
              </li>
            </ul>
              {/* <UserContainer /> */}
              {/* <ToDoContainer />*/}
            <Route path="/timings" exact component={Timings}></Route>
            <Route path="/" exact component={Dashboard}></Route>
            <Route path="/timings/:word" exact strict component={testFunctionalComp}></Route>
            <Route path="/ToDoContainer" exact strict component={ToDoContainer}></Route>
            <Route path="/HooksToDoContainer" exact strict 
            render={() =>
            (this.state.loggedin ? (<HooksToDoContainer />) : (<Redirect to="/timings/afterRedirect" />)
            )}/>
            <Prompt when={!this.state.loggedin}
            message ={(location) =>{
              return location.pathname.startsWith('/ToDoContainer') ? 'sure ?' : true  
                              }} >
           </Prompt>
          </div>
          </div> 
      </div>
       </Provider>
    </Router>
  );
}
}

export default App;

/* Added routes in APP.js, changed APP from functional to Class comp
// source - React Router Complete Guide (Route, Link, NavLink, Redirect, Prompt )
// https://www.youtube.com/watch?v=XRfD8xIOroA&list=WL&index=33
## need to make header good and add styling
*/