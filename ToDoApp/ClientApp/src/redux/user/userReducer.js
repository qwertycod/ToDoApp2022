const {Logout_User,FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS,
     Authenticate_User_Success, Authenticate_User_Failure, Reset_LoginForm } = require("./userTypes")

const initialState = {
    loading : true,
    user : {},
    error : '',
    userId : localStorage.getItem('userId'),
    'isAuthenticated': false,
    prinicleUser : '',
    token : localStorage.getItem('token')
}

const userReducer = (state = initialState, action) =>
{
    switch(action.type){
        case FETCH_USERS_REQUEST :
            return {
                ...state,
                loading : true
            }
            case FETCH_USERS_SUCCESS :
                return {
                    loading: false,
                    error: '',
                    user : action.payload
                }
        case FETCH_USERS_FAILURE :
            return {
                loading : false,
                user: {},
                error:   action.payload
            } 
         case Authenticate_User_Success :
            return {
                loading : false,
                user:  action.payload,
                isAuthenticated : true,
                prinicleUser: action.payload.username,
               // token: action.payload.token
            }
            case Authenticate_User_Failure :
                return {
                    loading : false,
                    user:  {},
                    isAuthenticated : false,
                    error: action.payload
                }
             case Logout_User :
                 localStorage.removeItem('userId')
                 localStorage.removeItem('token')
                    return {
                      initialState
                    }
             case Reset_LoginForm :
                 return {
                     initialState
                 }
        default : return state
    }
}

export default userReducer