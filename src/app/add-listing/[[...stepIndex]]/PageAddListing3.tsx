"use client";
import NcInputNumber from "@/components/NcInputNumber";
import React, { FC } from "react";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useEffect, useState, useRef } from "react";
import { Value } from "sass";

export interface PageAddListing3Props {}

interface Page3State {
  portionName: string[];
  portionSize: number[];
  guests: number[];
  bedrooms: number[];
  beds: number[];
  bathroom: number[];
  kitchen: number[];
}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  // TODO: declaring the type of object which is used as the value in array of input fields
  let portions = 0;
  const data = localStorage.getItem("page1") || "";
  if (data) {
    const value = JSON.parse(data)["numberOfPortions"];
    if (value) {
      portions = parseInt(value, 10);
    }
  }
  const emptyStringArrayGenerator = (size: number) => {
    const emptyStringArray = Array.from({ length: size }, () => "");
    return emptyStringArray;
  };
  const emptyNumberArrayGenerator = (size: number) => {
    const emptyNumberArray = Array.from({ length: size }, () => 0);
    return emptyNumberArray;
  };

  const [myArray, setMyArray] = useState<number[]>([]);
  const [portionName, setPortionName] = useState<string[]>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return emptyStringArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["portionName"];
    return value || emptyStringArrayGenerator(portions);
  });

  const [portionSize, setPortionSize] = useState<number[]>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["portionSize"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [guests, setGuests] = useState<number[]>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["guests"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [bedrooms, setBedrooms] = useState<number[]>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["bedrooms"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [beds, setBeds] = useState<number[]>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["beds"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [bathroom, setBathroom] = useState<number[]>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["bathroom"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [kitchen, setKitchen] = useState<number[]>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (!savedPage) {
      return emptyNumberArrayGenerator(portions);
    }
    const value = JSON.parse(savedPage)["kitchen"];
    return value || emptyNumberArrayGenerator(portions);
  });

  const [page3, setPage3] = useState<Page3State>({
    portionName: portionName,
    portionSize: portionSize,
    guests: guests,
    bedrooms: bedrooms,
    beds: beds,
    bathroom: bathroom,
    kitchen: kitchen,
  });

  useEffect(() => {
    const newArray = Array(portions).fill(1);
    setMyArray(newArray);
  }, []);

  useEffect(() => {
    const newPage3: Page3State = {
      portionName: portionName,
      portionSize: portionSize,
      guests: guests,
      bedrooms: bedrooms,
      beds: beds,
      bathroom: bathroom,
      kitchen: kitchen,
    };
    setPage3(newPage3);
    localStorage.setItem("page3", JSON.stringify(newPage3));
  }, [portionName, portionSize, guests, bedrooms, beds, bathroom, kitchen]);

  return (
    <div className=" flex justify-center items-center gap-16 w-[1100px] -ml-52 flex-wrap">
      {myArray.map((item, index) => (
        <div
          key={index}
          className=" flex flex-col border border-white p-1 rounded-3xl shadow-lg p-2 pb-4"
        >
          <h2 className="text-md font-semibold ml-2 mt-2">Name of {myArray.length > 1 ? `Portion ${index + 1}` : `Property`} </h2>
          <input
            type="text"
            className=" bg-transparent w-5/6 mx-auto my-2 rounded-2xl text-sm"
            value={portionName[index]}
            onChange={(e) =>
              setPortionName((prev) => {
                const newArray = [...prev];
                newArray[index] = e.target.value;
                return newArray;
              })
            }
          />
          <div className="flex items-center justify-around mb-4">
            <h2 className="text-md font-semibold ">
              Size(m<sup>2</sup>)
            </h2>
            <input
              type="text"
              className="bg-transparent rounded-2xl w-2/5 text-center"
              value={portionSize[index]}
              onChange={(e) =>
                setPortionSize((prev) => {
                  const newArray = [...prev];
                  newArray[index] = parseInt(e.target.value) || 0;
                  return newArray;
                })
              }
            />
          </div>
          {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
          {/* FORM */}
          <div className="space-y-8 mx-4">
            <NcInputNumber
              label="Guests"
              defaultValue={guests[index]}
              onChange={(value) =>
                setGuests((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Bedroom"
              defaultValue={bedrooms[index]}
              onChange={(value) =>
                setBedrooms((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Beds"
              defaultValue={beds[index]}
              onChange={(value) =>
                setBeds((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Bathroom"
              defaultValue={bathroom[index]}
              onChange={(value) =>
                setBathroom((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
            <NcInputNumber
              label="Kitchen"
              defaultValue={kitchen[index]}
              onChange={(value) =>
                setKitchen((prev) => {
                  const newArray = [...prev];
                  newArray[index] = value;
                  return newArray;
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageAddListing3;
