import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TrainingRegistration from "./TrainingRegistration";
import TrainingList from "./TrainingList";

const UserProfile = () => {
  const [user, setUser] = useState([]),
    [changedTraining, setChangedTraining] = useState(false);

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
      <p> id:{user.id}</p>
      {user.name}
      <TrainingRegistration
        changedTraining={changedTraining}
        setChangedTraining={setChangedTraining}
      />
      <TrainingList
        changedTraining={changedTraining}
        setChangedTraining={setChangedTraining}
      />
    </div>
  );
};

export default UserProfile;
