"use client";

import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import NcInputNumber from "@/components/NcInputNumber";
import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export interface PageAddListing9Props {}

const PageAddListing9: FC<PageAddListing9Props> = () => {
  let portions = 0;
  const data = localStorage.getItem("page1") || "";
  if (data) {
    const value = JSON.parse(data)["numberOfPortions"];
    if (value) {
      portions = parseInt(value, 10);
    }
  }

  const [datesPerPortion, setDatesPerPortion] = useState<number[][]>(() => {
    const savedDates = localStorage.getItem("page9");
    return savedDates
      ? JSON.parse(savedDates)
      : Array.from({ length: portions }, () => []);
  });

  const [night, setNight] = useState<number[]> (() => {
    const nights = localStorage.getItem("nights");
    return nights
      ? JSON.parse(nights)
      : [1, 99  ];
  })

  const handleDateChange = (date: Date | null, portionIndex: number) => {
    if (!date) {
      return;
    }
    const newTime = date.getTime();
    console.log("newTime: ", newTime, datesPerPortion);
    setDatesPerPortion((prevDates) => {
      const updatedDates = [...prevDates];
      if (updatedDates[portionIndex].includes(newTime)) {
        updatedDates[portionIndex] = updatedDates[portionIndex].filter(
          (item) => item !== newTime
        );
      } else {
        updatedDates[portionIndex] = [...updatedDates[portionIndex], newTime];
      }
      console.log("updatedDates: ", updatedDates[portionIndex]);
      return updatedDates;
    });
  };

  const getAllSelectedDates = () => {
    return datesPerPortion.flat();
  };

  
  useEffect(() => {
    localStorage.setItem("nights", JSON.stringify(night));
    localStorage.setItem("page9", JSON.stringify(datesPerPortion));
  }, [datesPerPortion, night]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {` Shorter trips can mean more reservations, but you'll turn over your
          space more often.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-7">
        {/* ITEM */}
        <NcInputNumber label="Nights min" defaultValue={night[0]} onChange={(value) => setNight([value, night[1]])}/>
        <NcInputNumber label="Nights max" defaultValue={night[1]} onChange={(value) => setNight([night[0], value])}/>
      </div>

      {/*  */}
      <div>
        <h2 className="text-2xl font-semibold">Set your availability</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Editing your calendar is easy—just select a date to block or unblock
          it. You can always make changes after you publish.
        </span>
      </div>

      {datesPerPortion.map((dates, index) => (
        <div className="border border-white rounded-xl p-2" key={index}>
          <span className="text-2xl ml-4 font-medium">Portion {index + 1}</span>
          <div className="addListingDatePickerExclude mt-2" key={index}>
            <DatePicker
              onChange={(date) => handleDateChange(date, index)}
              // selected={startDate}
              monthsShown={2}
              showPopperArrow={false}
              // excludeDates={dates.filter(Boolean).map((item) => new Date(item))}
              excludeDates={getAllSelectedDates().map((item) => new Date(item))}
              inline
              renderCustomHeader={(p) => (
                <DatePickerCustomHeaderTwoMonth {...p} />
              )}
              renderDayContents={(day, date) => (
                <DatePickerCustomDay dayOfMonth={day} date={date} />
              )}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default PageAddListing9;
