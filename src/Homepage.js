import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import firebase from "./firebase"

function Homepage() {
    const history = useHistory()
  useEffect(() => {
    const user = firebase.auth().currentUser
    if (user){
      history.push('/')
    }else{
      history.push('/login')
      // User Logged out
    }
  }, [])
    const SignoutHandler = async () =>{
        await firebase.auth().signOut()
        
    }
    return (
        <div>
            Welcome to Homepage
            <button onClick={SignoutHandler}>
                signout
            </button>
        </div>

    )
}

export default Homepage
