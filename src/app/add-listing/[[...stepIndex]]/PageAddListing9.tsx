"use client";

import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import NcInputNumber from "@/components/NcInputNumber";
import React, { FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export interface PageAddListing9Props {}

interface ListingData {
  id: string;
  authorId: number;
  date: string;
  href: string;
  listingCategoryId: number;
  title: string;
  featuredImage: string;
  galleryImgs: string[];
  commentCount: number;
  viewCount: number;
  like: boolean;
  address: string;
  reviewStart: number;
  reviewCount: number;
  price: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff: string | null;
  isAds: string | null;
  map: {
    lat: number;
    lng: number;
  };
}

const initialListingData: ListingData = {
  id: "id1",
  authorId: 10,
  date: "May 20, 2021",
  href: "/listing-stay-detail",
  listingCategoryId: 17,
  title: "Best Western Cedars Hotel ",
  featuredImage: "https://res.cloudinary.com/dkfwmyr2k/image/upload/v1719236707/Cover_Image/eogjs7s55ge7uzwjlrzk.jpg",
  galleryImgs: [
    "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  ],
  commentCount: 70,
  viewCount: 602,
  like: false,
  address: "1 Anzinger Court",
  reviewStart: 4.8,
  reviewCount: 28,
  price: "$26",
  maxGuests: 6,
  bedrooms: 10,
  bathrooms: 3,
  saleOff: "-10% today",
  isAds: null,
  map: { lat: 55.2094559, lng: 61.5594641 }
};

const PageAddListing9: FC<PageAddListing9Props> = () => {
  let portions = 0;
  const data = localStorage.getItem("page1") || "";
  if (data) {
    const value = JSON.parse(data)["numberOfPortions"];
    if (value) {
      portions = parseInt(value, 10);
    }
  }

  const [myArray, setMyArray] = useState<number[]>(Array(portions).fill(1));

  //TODO: update listing data
  const [listingData, setListingData] = useState<ListingData>(() => {
    const savedData = localStorage.getItem("listingData");
    return savedData ? JSON.parse(savedData) : initialListingData;
  });

  useEffect(() => {
    localStorage.setItem("listingData", JSON.stringify(listingData));
  }, [listingData]);

   const updateListingData = (newData: Partial<ListingData>) => {
    setListingData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };


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
    setDatesPerPortion((prevDates) => {
      const updatedDates = [...prevDates];
      const index = updatedDates[portionIndex].indexOf(newTime);
      if (index !== -1) {
        updatedDates[portionIndex].splice(index, 1); // Remove the date if already selected
      } else {
        updatedDates[portionIndex].push(newTime); // Add the date if not selected
      }
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

    console.trace()

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

      {myArray.map((dates, index) => (
        <div className="border border-white rounded-xl p-2" key={index}>
          <span className="text-2xl ml-4 font-medium">Portion {index + 1}</span>
          <div className="addListingDatePickerExclude mt-2" key={index}>
            <DatePicker
              onChange={(date) => handleDateChange(date, index)}
              // selected={startDate}
              monthsShown={2}
              showPopperArrow={false}
              // excludeDates={getAllSelectedDates().map((item) => new Date(item))}
              excludeDates={datesPerPortion[index].map((item) => new Date(item))}
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
