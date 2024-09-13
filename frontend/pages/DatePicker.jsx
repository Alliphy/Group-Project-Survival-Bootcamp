import "flatpickr/dist/themes/material_green.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";

export const DatePicker = () => {
  console.log(dayjs().format());

  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    console.log("date", date);
  }, [date]);
  return (
    <Flatpickr
      data-enable-time
      value={date.toDate()}
      onChange={([date]) => {
        setDate(dayjs(date));
      }}
    />
  );
};
