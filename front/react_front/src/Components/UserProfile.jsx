import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("users/")[1];
  const url = "http://localhost:3001/users/" + id;

  useEffect(() => {
    axios
      .get(url)
      .then((results) => {
        console.log(results);
        setUser(results.data);
      })
      .catch((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className="UserProfile">
      <User data={user} key={user.id} />
    </div>
  );
};

export default UserProfile;
