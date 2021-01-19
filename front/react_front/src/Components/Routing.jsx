import React, {useEffect, useState} from "react";
import { PrimaryButton } from "./UIkit/index";
import { BrowserRouter as Router, Route, useHistory, Switch } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList';
import UserProfile from './UserProfile';
import UserEdit from "./UserEdit"
import SignUp from './SignUp';
import SignIn from "./SignIn";
import Auth from "./Auth";

const Routing = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("not login")
  const [currentUser, setCurrentUser] = useState()

  const history = useHistory()

  const login = () => {
    setLoggedInStatus('login')
  }

  const logout = () => {
    setLoggedInStatus('not login')
  }

  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/login", { withCredentials: true })
      .then(response => {
        console.log("registration res", response.data)
        if (response.data.logged_in){
          setLoggedInStatus('login')
          setCurrentUser(response.data.user.id)
        }else{
          setLoggedInStatus('not login')
        }
      
    }).catch(error => {
      console.log("ログインステータスエラー", error)
    })
  }

  useEffect(()=> {
    checkLoginStatus()
  })
  


  return (
    <div className="App">
      <p>{loggedInStatus}</p>
      {(loggedInStatus == 'login') &&
        <PrimaryButton
          label={"ログアウトする"}
          onClick={() =>
            axios.delete("http://localhost:3001/logout",
                { withCredentials: true }
            ).then(response => {
                console.log("registration res", response)
                logout()
            }).catch(error => {
                console.log("registration error", error)
                alert('ログアウトできませんでした。通信環境をご確認ください。')
            }
            )
          // event.preventDefault()
          }
        />
      }


      <Router>
        <Switch>
          <Route
            exact path={"/users"}
            render={props => (
              <UserList { ...props } loggedInStatus={loggedInStatus} />
            )}
          />
          <Route exact path='/users/:id' component={UserProfile}/>
          <Route
            exact path={'/users/:id/edit'}
            render={props => (
              <UserEdit { ...props } currentUser={currentUser} />
            )}
          />
          <Route exact path='/signup' component={SignUp}/>

          <Auth loggedInStatus = {loggedInStatus}>
            <Route
              exact path={"/signin"}
              render={props => (
                <SignIn { ...props } loggedInStatus={loggedInStatus}
                                      login={login}/>
              )}
            />
          </Auth>

        </Switch>
      </Router>
    </div>
  );
}



export default Routing;