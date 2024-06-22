"use client";
import NcInputNumber from "@/components/NcInputNumber";
import React, { FC } from "react";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useEffect, useState, useRef } from "react";

export interface PageAddListing3Props {}
const PageAddListing3: FC<PageAddListing3Props> = () => {
  let PartitionValueinPage3 = 0;
  const [myArray, setMyArray] = useState<number[]>([]);

  // TODO: declaring the type of object which is used as the value in array of input fields
  interface InputValue {
    [key: string]: string | number;
    name: string;
    size: string;
    acreage: string;
    guests: number;
    bedroom: number;
    beds: number;
    bathroom: number;
    kitchen: number;
  }

  // TODO: declaring the default data for each object
  const createDefaultObject = (): InputValue => ({
    name: "",
    size: "",
    acreage: "",
    guests: 4,
    bedroom: 4,
    beds: 4,
    bathroom: 2,
    kitchen: 2,
  });

  // TODO: creating an array of default objects
  const createDefaultArray = (num: number): InputValue[] => {
    return Array.from({ length: num }, createDefaultObject);
  };

  const [inputValues, setInputValues] = useState<InputValue[]>(
    createDefaultArray(
      localStorage.getItem("numberOfPartition")
        ? parseInt(localStorage.getItem("numberOfPartition")!)
        : 1
    )
  );
  const[inputBoxValueState, setInputBoxValueState] = useState<InputValue[]>([]);
 
  useEffect(() => {
    const storedValue = localStorage.getItem("numberOfPartition");
    if (storedValue) {
      PartitionValueinPage3 = parseInt(storedValue);
      const newArray = Array(PartitionValueinPage3).fill(1);
      setMyArray(newArray);
    }
  }, []);

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const obj = { ...inputValues[index] };
    obj[field] = value;
    const newValueArray = [...inputValues];
    newValueArray[index] = obj;
    setInputValues(newValueArray);
    localStorage.setItem("formInputValues", JSON.stringify(inputValues));
  };

  // TODO: handling input box
  const [inputBoxvalue, setInputBoxValue] = useState<string>("");
  const handleInputBoxChange = (index: number, field: string, event: any) => {
    const { key, ctrlKey, metaKey, altKey, code } = event;
    const blockedKeys = [
      "Shift",
      "Home",
      "EageUp",
      "Pnd",
      "PageDown",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Insert",
    ];

    if (key === "Backspace" || key === "Delete" || code === "Space") {
      if (code === "Space") {
        setInputBoxValue((prevValue) => prevValue + " ");
        return;
      } else {
        setInputBoxValue((prevValue) => prevValue.slice(0, -1));
        return;
      }
    }
    if (ctrlKey || metaKey || altKey) {
      return;
    }
    if (/^[a-zA-Z0-9]$/.test(key)) {
      setInputBoxValue((prevValue) => prevValue + key);
    } else {
      // Prevent the default action for all other keys
      event.preventDefault();
      console.log('normal vala else: ', key)
    }
    console.log('here1');
    if(!blockedKeys.includes(key)){
      // console.log("inputBoxValue",inputBoxvalue, key)
      let obj = { ...inputValues[index] };
      console.log('inputboxValue: ', inputBoxvalue)
      obj[field] = inputBoxvalue + key;
      // console.log('object2: ', obj)
      const newValueArray = [...inputValues];
      // console.log(newValueArray)
      newValueArray[index] = obj;
      // console.log(newValueArray)
      setInputValues(newValueArray);
      setInputBoxValueState(newValueArray);
      // console.log(inputValues);
      localStorage.setItem("formInputValues", JSON.stringify(newValueArray));
    }
    console.log('here2')
  };

  // TODO: declaring useRef for input field
  const nameRef = useRef<any>(null);
  const guestRef = useRef<any>(null);

  return (
    <div className=" flex justify-center items-center gap-16">
      {myArray.map((item, index) => (
        <div
          key={index}
          className=" flex flex-col border border-white p-1 rounded-md shadow-lg"
        >
          <h2 className="text-md font-semibold">
            Name of partition {index + 1}
          </h2>
          <input
            type="text"
            className=" bg-transparent w-5/6 mx-auto my-2 rounded-2xl text-sm"
            ref={nameRef}
            // value={inputValues[index].name}
            // value={inputBoxvalue}
            value={inputBoxValueState[index]?.name}
            // defaultValue={
            //   localStorage.getItem("formInputValues")
            //     ? JSON.parse(localStorage.getItem("formInputValues")!)[index].name
            //     : ""
            // }
            onKeyDown={(e) => handleInputBoxChange(index, "name", e)}
          />
          <div className="flex items-center justify-around mb-4">
            <h2 className="text-md font-semibold ">
              Size(m<sup>2</sup>)
            </h2>
            <input
              type="text"
              className="bg-transparent rounded-2xl w-2/5 text-center"
              value={inputValues[index].size}
              // defaultValue={
              //   localStorage.getItem("formInputValues")
              //     ? JSON.parse(localStorage.getItem("formInputValues")!)[index]
              //         .size
              //     : ""
              // }
              onKeyDown={(e) => handleInputBoxChange(index, "size", e)}
            />
          </div>
          {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
          {/* FORM */}
          <div className="space-y-8 mx-4">
            <NcInputNumber
              label="Guests"
              // defaultValue={4}
              // defaultValue={inputValues[index].guests}
              // defaultValue={
              //   localStorage.getItem("formInputValues")
              //     ? JSON.parse(localStorage.getItem("formInputValues")!)[index]
              //         .guests
              //     : 4
              // }
              // ref={guestRef}
              onChange={(value) => handleChange(index, "guests", value)}
            />
            <NcInputNumber
              label="Bedroom"
              // defaultValue={4}
              // defaultValue={inputValues[index].bedroom}
              // defaultValue={
              //   localStorage.getItem("formInputValues")
              //     ? JSON.parse(localStorage.getItem("formInputValues")!)[index]
              //         .bedroom
              //     : 4
              // }
              onChange={(value) => handleChange(index, "bedroom", value)}
            />
            <NcInputNumber
              label="Beds"
              // defaultValue={4}
              // defaultValue={inputValues[index].beds}
              // defaultValue={
              //   localStorage.getItem("formInputValues")
              //     ? JSON.parse(localStorage.getItem("formInputValues")!)[index]
              //         .beds
              //     : 4
              // }
              onChange={(value) => handleChange(index, "beds", value)}
            />
            <NcInputNumber
              label="Bathroom"
              // defaultValue={2}
              // defaultValue={inputValues[index].bathroom}
              // defaultValue={
              //   localStorage.getItem("formInputValues")
              //     ? JSON.parse(localStorage.getItem("formInputValues")!)[index]
              //         .bathroom
              //     : 2
              // }
              onChange={(value) => handleChange(index, "bathroom", value)}
            />
            <NcInputNumber
              label="Kitchen"
              // defaultValue={2}
              // defaultValue={inputValues[index].kitchen}
              // defaultValue={
              //   localStorage.getItem("formInputValues")
              //     ? JSON.parse(localStorage.getItem("formInputValues")!)[index]
              //         .kitchen
              //     : 2
              // }
              onChange={(value) => handleChange(index, "kitchen", value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageAddListing3;
