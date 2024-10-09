import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";

export const DatePicker = (props) => {
  const [date, setDate] = useState(dayjs());
  const [avails, setAvails] = useState([]);

  const flatpickr = useRef(null);

  console.log(props.selectInstructor);

  useEffect(() => {
    fetch("/api/instructor-avails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // Here, "selectInstructor" is the last name of the selected instructor from the footer component.
      body: JSON.stringify({ instructor: props.selectInstructor }),
    }).then(async (data) => {
      const availArr = await data.json();
      setAvails(availArr);
      flatpickr.current.flatpickr.redraw();
    });
  }, []);

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
        minDate: "today",
        maxDate: new Date().fp_incr(60),

        enable: avails,
        locale: {
          firstDayOfWeek: 1, // start week on Monday
        },
      }}
      onDayCreate={(selectedDates) => {
        selectedDates.forEach((date) => {
          //  TODO //
          // REFACTOR THIS TO WORK FOR APPOINTMENT CREATION
          // THIS SHOULD MAKE A CALL BACK TO THE DB TO SET THE SELECTED INSTRUCTOR
          // ON THE SELECTED DATE TO BE FALSE IN THE AVAILS TABLE
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
