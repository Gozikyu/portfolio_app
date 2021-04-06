import React from "react";
import { useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarComponent = (props) => {
  const training = [];
  const history = useHistory();

  const setTraining = () => {
    props.trainings.map((userTraining) => {
      const t = {
        id: userTraining.id,
        title: userTraining.menu,
        start: userTraining.date,
        allDay: true,
        url:
          process.env.REACT_APP_HOST +
          ":3000" +
          "/users/" +
          userTraining.user_id +
          "/trainings/" +
          userTraining.id,
      };

      training.push(t);
    });
  };

  setTraining();

  return (
    <div>
      <FullCalendar
        locale="ja"
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        slotDuration="00:30:00"
        selectable={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "00:00",
          endTIme: "24:00",
        }}
        weekends={true}
        titleFormat={{
          year: "numeric",
          month: "short",
        }}
        headerToolbar={{
          start: "title",
          center: "prev, next, today",
          end: "dayGridMonth,timeGridWeek",
        }}
        events={training}
        handleDateClick
      />
    </div>
  );
};

export default CalendarComponent;
