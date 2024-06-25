"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Checkbox from "@/shared/Checkbox";

export interface PageAddListing4Props {}

interface checkBoxState {
  [key: string]: any;
}

const PageAddListing4: FC<PageAddListing4Props> = () => {

  const [savedAmenitites, setSavedAmenities] = useState<checkBoxState[]>(() => {
    const savedPage = localStorage.getItem("page4") || "";
    if (!savedPage) {
      return [generalAmenities, otherAmenities, safeAmenities];
    }
    const value = JSON.parse(savedPage);
    return value || [generalAmenities, otherAmenities, safeAmenities];
  });

  const generalAmenities: checkBoxState = {
    Wifi: savedAmenitites[0].Wifi || false,
    Internet: savedAmenitites[0].Internet || true,
    TV: savedAmenitites[0].TV || true,
    "Air conditioning": savedAmenitites[0]["Air conditioning"] || false,
    Fan: savedAmenitites[0].Fan || false,
    "Private entrance": savedAmenitites[0]["Private entrance"] || false,
    Dryer: savedAmenitites[0].Dryer || true,
    Heater: savedAmenitites[0].Heater || false,
    "Washing machine": savedAmenitites[0]["Washing machine"] || false,
    Detergent: savedAmenitites[0].Detergent || true,
    "Clothes dryer": savedAmenitites[0]["Clothes dryer"] || false,
    "Baby cot": savedAmenitites[0]["Baby cot"] || true,
    Desk: savedAmenitites[0].Desk || false,
    Fridge: savedAmenitites[0].Fridge || true,
  };

  const otherAmenities: checkBoxState = {
    Wardrobe: savedAmenitites[1].Wardrobe,
    "Cloth hook": savedAmenitites[1]["Cloth hook"],
    "Extra cushion": savedAmenitites[1]["Extra cushion"],
    "Gas stove": savedAmenitites[1]["Gas stove"],
    "Toilet paper": savedAmenitites[1]["Toilet paper"],
    "Free toiletries": savedAmenitites[1]["Free toiletries"],
    "Makeup table": savedAmenitites[1]["Makeup table"],
    "Hot pot": savedAmenitites[1]["Hot pot"],
    "Bathroom heaters": savedAmenitites[1]["Bathroom heaters"],
    Kettle: savedAmenitites[1].Kettle,
    Dishwasher: savedAmenitites[1].Dishwasher,
    "BBQ grill": savedAmenitites[1]["BBQ grill"],
    Toaster: savedAmenitites[1].Toaster,
    Towel: savedAmenitites[1].Towel,
    "Dining table": savedAmenitites[1]["Dining table"],
  };

  const safeAmenities: checkBoxState = {
    "Fire Siren": savedAmenitites[2]["Fire Siren"],
    "Fire extinguisher": savedAmenitites[2]["Fire extinguisher"],
    "Antitheft Key": savedAmenitites[2]["Antitheft Key"],
    "Safe Vault": savedAmenitites[2]["Safe Vault"],
  };

  const [amenities, setAmenities] = useState<checkBoxState[]>([
    generalAmenities,
    otherAmenities,
    safeAmenities,
  ]);

  // const [savedAmenitites, setSavedAmenities] = useState<checkBoxState[]>(() => {
  //   const savedPage = localStorage.getItem("page4") || "";
  //   if (!savedPage) {
  //     return [generalAmenities, otherAmenities, safeAmenities];
  //   }
  //   const value = JSON.parse(savedPage);
  //   return value || [generalAmenities, otherAmenities, safeAmenities];
  // });

  // const handleCheckboxChange = (name: string, checked: boolean, index:number) => {
  //   setAmenities((prevAmenities) =>
  //     prevAmenities.map((prevAmenity) => ({
  //       ...prevAmenity,
  //       [name]: checked,
  //     }))
  //   );
  // };

  const handleCheckboxChange = (name: string, checked: boolean, index:number) => {
    setAmenities((prevAmenities) =>{
      const newAmenities = [...prevAmenities];
      console.log("new: ",newAmenities)
      newAmenities[index][name] = checked;
      return newAmenities;  
    })
  };

  useEffect(() => {
    console.log("amenities: ", amenities);
    localStorage.setItem("page4", JSON.stringify(amenities));
  }, [amenities]);


  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Amenities </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Many customers have searched for accommodation based on amenities
          criteria
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            General amenities
          </label>
          {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox label="Wifi" name="Wifi" defaultChecked />
            <Checkbox label="Internet" name="Internet" />
            <Checkbox label="TV" name="TV" defaultChecked />
            <Checkbox label="Air conditioning" name="Air conditioning" />
            <Checkbox label="Fan" name="Fan" />
            <Checkbox label="Private entrance" name="Private entrance" />
            <Checkbox label="Dryer" name="Dryer" defaultChecked />
            <Checkbox label="Heater" name="Heater" />
            <Checkbox label="Washing machine" name="Washing machine" />
            <Checkbox label="Detergent" name="Detergent" defaultChecked />
            <Checkbox label="Clothes dryer" name="Clothes dryer" />
            <Checkbox label="Baby cot" name="Baby cot" />
            <Checkbox label="Desk" name="Desk " defaultChecked />
            <Checkbox label="Fridge" name="Fridge" />
            <Checkbox label="Dryer" name="Dryer" defaultChecked />
          </div> */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.keys(amenities[0]).map((key) => (
              <Checkbox
                className=" cursor-pointer"
                key={key}
                label={key}
                name={key}
                onChange={(checked) => handleCheckboxChange(key, checked, 0)}
                {...(amenities[0][key] && { defaultChecked: true })}
              />
            ))}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Other amenities
          </label>
          {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <Checkbox
                            label="Wardrobe"
                            name="Wardrobe"
                            defaultChecked
                        />
                        <Checkbox label="Cloth hook" name="Cloth hook" />
                        <Checkbox
                            label="Extra cushion"
                            name="Extra cushion"
                            defaultChecked
                        />
                        <Checkbox label="Gas stove" name="Gas stove" />
                        <Checkbox label="Toilet paper" name="Toilet paper" />
                        <Checkbox
                            label="Free toiletries"
                            name="Free toiletries"
                            defaultChecked
                        />
                        <Checkbox label="Makeup table" name="Makeup table" />
                        <Checkbox label="Hot pot" name="Hot pot" />
                        <Checkbox
                            label="Bathroom heaters"
                            name="Bathroom heaters"
                        />
                        <Checkbox label="Kettle" name="Kettle" defaultChecked />
                        <Checkbox label="Dishwasher" name="Dishwasher" />
                        <Checkbox
                            label="BBQ grill"
                            name="BBQ grill"
                            defaultChecked
                        />
                        <Checkbox
                            label="Toaster"
                            name="Toaster"
                            defaultChecked
                        />
                        <Checkbox label="Towel" name="Towel" />
                        <Checkbox label="Dining table" name="Dining table" />
                    </div> */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.keys(amenities[1]).map((key) => (
              <Checkbox
                key={key}
                label={key}
                name={key}
                onChange={(checked) => handleCheckboxChange(key, checked, 1)}
                {...(amenities[1][key] && { defaultChecked: true })}
              />
            ))}
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Safe amenities
          </label>
          {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <Checkbox
                            label="Fire siren"
                            name="Fire siren"
                            defaultChecked
                        />
                        <Checkbox
                            label="Fire extinguisher"
                            name="Fire extinguisher"
                        />
                        <Checkbox
                            label="Anti-theft key"
                            name="Anti-theft key"
                        />
                        <Checkbox label="Safe vault" name="Safe vault" />
                    </div> */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.keys(amenities[2]).map((key) => (
              <Checkbox
                key={key}
                label={key}
                name={key}
                onChange={(checked) => handleCheckboxChange(key, checked, 2)}
                {...(amenities[2][key] && { defaultChecked: true })}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing4;
