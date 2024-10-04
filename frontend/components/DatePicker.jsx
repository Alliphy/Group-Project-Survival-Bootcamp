import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";

export const DatePicker = (props) => {
  console.log(dayjs().format());

  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    console.log("date", date);
  }, [date]);
  return (
    <Flatpickr
      className="event"
      options={{
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date().fp_incr(60),
        inline: true,
        enable: [],
        //------------------- plugins: new confirmNewDatePlugin({}),
        locale: {
          firstDayOfWeek: 1, // start week on Monday
        },
      }}
      onDayCreate={(selectedDates) => {
        selectedDates.forEach((date) => {
          // courses[currentInstructor.name].find Course => Course.availableDates.find theDate =>
          // theDate = date
        });
      }}
      data-enable-time
      value={date.toDate()}
      onChange={([date]) => {
        setDate(dayjs(date));
      }}
    />
  );
};
