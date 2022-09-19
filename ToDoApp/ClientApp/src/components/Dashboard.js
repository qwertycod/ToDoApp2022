import { Component } from 'react';
import { connect , useDispatch} from 'react-redux'
import { fetchUsers, authenticateUsers, logoutUser, resetLogin } from '../redux'
import Login from './Login'
import GetUserTodoItems from './GetUserTodoItems'

let apiRootUrl = "https://localhost:44347/";

class Dashboard extends Component {
constructor(props){
  super(props)
  this.handleLoad = this.handleLoad.bind(this)
    this.testProp = this.props.error;         // for testing to show we can have other keep a prop value inside another property
  if (window.performance) {
    if (performance.navigation.type == 1) {
      this.props.state.user.error = '' 
    }
    else {
     // alert( "This page is not reloaded");
    }
  }
}
componentDidMount() {
  window.addEventListener('load', this.handleLoad);
  }

componentWillUnmount() { 
 window.removeEventListener('load', this.handleLoad)  
}
handleLoad() {
  this.props.state.user.error = '' //  $ is available here
}

loginHandler = (type, data) => {
  switch(type) {
    case "Login_task":
    this.props.authenticateUsers(data);
      break;
    case "Reset_login_form":
      this.props.resetToInitialState()
    default:
    }
};

    headers = () => {
      return   {
          'Content-Type': 'application/json',
          'Authorization': this.props.state.user.token
        }           
    }
      ClearStore = () => {
        localStorage.clear();
        this.logOut();
        window.location.reload();
        alert('storage cleared !')
      }
    
      logOut =() =>{
     //   this.props.user.FirstName = "ABC";
       this.props.logoutUser(this.props.state.user.token)
      }
      reset =() =>{
        this.props.resetLogin()
       }
    render() {
        console.log(this.props.state)
        const isSignedInUser =  (this.props.state && this.props.state.user &&
        this.props.state.user.prinicleUser) 
        return (
         <div>
           <div className="headerDiv">
            <div  style={{color: "red", margin: "10px", fontWeight:"bold"}}>
                     {isSignedInUser ?
                     'Welcome ' +  isSignedInUser  
                     :
                     'Please login ' }  
             </div>
             <div> 
              {isSignedInUser && 
                <button onClick={this.logOut}>Logout</button>
                 }
               </div>
             <div>
               <button onClick={this.ClearStore}>Clear storage</button>
             </div>
            </div>
              <div>
                   {this.props.state.user && this.props.state.user.isAuthenticated &&
                    <GetUserTodoItems headers={this.headers}
                     id={this.props.state.user.user.id} />   }
                </div>

                {/* <div>
                   {this.props.state.user && this.props.state.user.isAuthenticated &&
                    <Vidyarthi headers={this.headers} apiRootUrl={apiRootUrl}
                     id={this.props.state.user.user.id} />   }
                </div> */}

              {this.props.state && this.props.state.user && !this.props.state.user.prinicleUser &&
                    <Login 
                    loginError = {this.props.state.user.error}
                    callbackHandler={this.loginHandler}
                    // callbackHandler={this.props.callbackHandler}
                    // if parent need not filter out child's requests 
                  /> 
                }
        </div>
        )
    }
}
 
const mapStateToProps = state => {
    return {
        state : state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: (x) =>  dispatch(logoutUser(x)) ,
        authenticateUsers: (loginInfo) =>  dispatch(authenticateUsers(loginInfo)) ,
        resetToInitialState: () =>  dispatch(resetLogin()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);