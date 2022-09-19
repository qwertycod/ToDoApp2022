import React, { Component } from 'react';
import { connect , useDispatch} from 'react-redux'
import { authenticateUsers } from '../redux'
import  '../w3.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName:'',
            Password : '',
        };
   this.baseState = this.state ///>>>>>>>>> note this one.

    }
    
    componentDidMount(){
    }

    authenticateUsersClick = () =>{
        var data = {
            "UserName" : this.state.UserName,
            "Password" : this.state.Password,
        }
        console.log('user login data is ...' )
        this.auth()
    }

    changeHandler = (e) =>{
      this.setState({[e.target.name]:  e.target.value})
    }

    onLoginButtonClick = () => {
        let data = {
            "UserName" : this.state.UserName.trim(),
            "Password" : this.state.Password ,
        }
        if((data.UserName && data.Password ) == '') {
            alert("please enter user details !");
            return
        }
        // let data = {
        //     "UserName" : "Alex",
        //     "Password" : "1234",
        // }
        this.props.callbackHandler(
          "Login_task",
          data,
        );
      };
      onResetButtonClick = () => {
        this.setState(this.baseState)
          this.props.callbackHandler (
              "Reset_login_form"
          )
      }
      _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
           this.onLoginButtonClick()
        }
      }
    render() {
        const {UserName, Password } = this.state;
        var outpuHtml = 
        <div>
            <div className="LoginPageMain">
                <div className="w3-modal-content w3-card-4 w3-animate-zoom" ></div>
                <div className="w3-center"><br></br>
                </div>

                <div className="w3-container">
                    <div className="w3-section">
                        <label><b>UserName</b></label>
                        <input name="UserName"  onKeyDown={this._handleKeyDown} value ={UserName} onChange={this.changeHandler} className="w3-input w3-border w3-margin-bottom" type="text"   />

                        <label><b>Password</b></label>
                        <input name="Password"  onKeyDown={this._handleKeyDown} value={Password} onChange={this.changeHandler} class="w3-input w3-border" type="password"   />
                      </div>
                </div>
                <div >
                <button onClick={this.onLoginButtonClick} style={{margin:"10px"}}>Login</button>
                <button onClick={this.onResetButtonClick}>Reset</button>

                <div style={{color: "red", margin: "10px", fontWeight:"bold", fontSize:"25px"}}>
                    <label>{this.props.loginError}</label>
                </div>
        </div>
     </div>
     </div>
        return outpuHtml
    }
  }
 export default Login
// const mapStateToProps = (state) => {
//     return {
//       images: state.user,
//     };
//   };
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       authenticate: () => dispatch(authenticateUsers()),
//     };
//   };

// export default connect(mapDispatchToProps, mapDispatchToProps)(Login);