import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserList from './UserList';
import UserProfile from './UserProfile';
import SignUp from './SignUp';


const Routing = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path='/users' component={UserList}/>
          <Route exact path='/users/:id' component={UserProfile}/>
          <Route exact path='/signup' component={SignUp}/>
        </div>
      </Router>
    </div>
  );
}

export default Routing;