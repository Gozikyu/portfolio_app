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
          "http://localhost:3000/users/" +
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
        locale="ja" // ロケール設定。
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // 週表示、月表示、日付等のクリックを可能にするプラグインを設定。
        initialView="dayGridMonth" // カレンダーの初期表示設定。この場合、週表示。
        slotDuration="00:30:00" // 週表示した時の時間軸の単位。
        selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ。
        businessHours={{
          // ビジネス時間の設定。
          daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
          startTime: "00:00",
          endTIme: "24:00",
        }}
        weekends={true} // 週末を強調表示する。
        titleFormat={{
          // タイトルのフォーマット。(詳細は後述。※1)
          year: "numeric",
          month: "short",
        }}
        headerToolbar={{
          // カレンダーのヘッダー設定。(詳細は後述。※2)
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
