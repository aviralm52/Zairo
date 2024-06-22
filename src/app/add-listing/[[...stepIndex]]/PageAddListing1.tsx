"use client";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { PortionsContext } from "@/app/Store/portionStore";


export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const [showPortionsInput, setShowPortionsInput] = useState(false);
  const [numberOfPortions, setNumberOfPortions] = useState(1);

  useEffect(() => {
    const storedValue = localStorage.setItem("numberOfPartition", '1');
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const value = 1;
    if (selectedValue === "Private room") {
      setNumberOfPortions(value);
      localStorage.setItem("numberOfPartition", value.toString());
    }
    // Example logic to handle when to show portions input
    if (selectedValue === "Private room by portion") {
      console.log("private room by portion");
      setShowPortionsInput(true);
    } else {
      setShowPortionsInput(false);
    }
  };

  const handlePortionsInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10); // Ensure input value is parsed to an integer
    setNumberOfPortions(value);
    localStorage.setItem("numberOfPartition", value.toString());
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem
          label="Choose a property type"
          desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
        >
          <Select>
            <option value="Hotel">Hotel</option>
            <option value="Cottage">Cottage</option>
            <option value="Villa">Villa</option>
            <option value="Cabin">Cabin</option>
            <option value="Farm stay">Farm stay</option>
            <option value="Houseboat">Houseboat</option>
            <option value="Lighthouse">Lighthouse</option>
          </Select>
        </FormItem>
        <FormItem
          label="Place name"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input placeholder="Places name" />
        </FormItem>
        <FormItem
          label="Rental form"
          desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
        >
          <Select onChange={handleSelectChange}>
            {/* <option value="Share room">Share room</option> */}
            <option value="Private room">Private room</option>
            <option value="Private room by portion">
              Private room by portion
            </option>
            <option value="Shared Room">Shared Room</option>
            <option value="Hotel Room">Hotel Room </option>
          </Select>
          {showPortionsInput && (
            <input
              className=" mt-4 rounded-lg text-black cursor-pointer text-sm"
              type="number"
              value={numberOfPortions}
              onChange={handlePortionsInputChange}
              placeholder="Number of portions"
            />
          )}
        </FormItem>
      </div>
    </div>
  );
};
export const useClient = true;

export default PageAddListing1;
