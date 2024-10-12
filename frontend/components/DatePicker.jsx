import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";

export const DatePicker = (props) => {
  const { date, setDate, avails, setAvails } = props;

  const flatpickr = useRef(null);

  useEffect(() => {
    console.log("date", date);
  }, [date]);

  return (
    <Flatpickr
      ref={flatpickr}
      className="event"
      options={{
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        enableTime: false,
        minDate: "today",
        maxDate: new Date().fp_incr(60),
        enable: avails,
        locale: {
          firstDayOfWeek: 1, // start week on Monday
        },
      }}
      data-enable-time
      value={date.toDate()}
      onChange={([date]) => {
        setDate(dayjs(date));
      }}
    />
  );
};
