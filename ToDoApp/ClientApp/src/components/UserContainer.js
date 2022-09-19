import React, {useEffect} from 'react';
import { connect , useDispatch} from 'react-redux'
import { fetchUsers } from '../redux'

function UserContainer( {userData , fetchUsers} ) {
    useEffect(() => {
        fetchUsers()
    }, [])
    console.log('state ............')
    console.log(userData)
    return userData.loading ? (
        <h2>Loading...</h2>
    ) :
    userData.error ? <h2>{userData.error}</h2>
    :
    (
        <div>
             <h2>User Data</h2>
             <div>
                 {userData && userData.users &&
                    userData.users.map(u => <p>{u.name}</p>)
                }
             </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userData : state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () =>  dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);