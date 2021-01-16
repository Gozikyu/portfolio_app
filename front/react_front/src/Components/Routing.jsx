import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList';
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import SignIn from "./SignIn";


const Routing = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("not login")
  const [user, setUser] = useState({})

  const handleLogin = (data) => {
    setLoggedInStatus('login')
    setUser(data.user)
  }

  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data)
  }

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/login", { withCredentials: true })
      .then(response => {
      console.log("ログイン状況", response)
      setLoggedInStatus('login')
    }).catch(error => {
      console.log("ログインエラー", error)
      setLoggedInStatus('not login')
    })
  }

  useEffect(()=> {
    checkLoginStatus()
  })

  return (
    <div className="App">
      <Router>
        <p>{loggedInStatus}</p>
        <div>
          {/* <Route exact path='/users' component={UserList}/> */}
          <Route
            exact path={"/users"}
            render={props => (
              <UserList { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
          <Route exact path='/users/:id' component={UserProfile}/>
          <Route exact path='/signup' component={SignUp}/>
          {/* <Route exact path='/signin' component={SignIn}/> */}
          <Route
            exact path={"/signin"}
            render={props => (
              <SignIn { ...props } loggedInStatus={loggedInStatus}
                                     handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
            )}
          />
        </div>
      </Router>
    </div>
  );
}

export default Routing;