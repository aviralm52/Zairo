"use client";
import React, { FC } from "react";
import Textarea from "@/shared/Textarea";
import { useEffect, useState } from "react";

export interface PageAddListing6Props {}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  let PartitionValueinPage6 = 0;
  const [myArray, setMyArray] = useState<number[]>([]);

  useEffect(() => {
    const storedValue = localStorage.getItem("numberOfPartition");
    if (storedValue) {
      PartitionValueinPage6 = parseInt(storedValue);
      const newArray = Array(PartitionValueinPage6).fill(1);
      setMyArray(newArray);
      // console.log(myArray);
    }
  }, []);

  return (
    <div className=" flex flex-col gap-8">
      {myArray.map((item, index) => (
        <div key={index}>
          <div>
            <h2 className="text-2xl font-semibold">
              Your place description for '{localStorage.getItem('formInputValues') ? JSON.parse(localStorage.getItem('formInputValues')!)[index].name : ""} '
            </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Mention the best features of your accommodation, any special
              amenities like fast Wi-Fi or parking, as well as things you like
              about the neighborhood.
            </span>
          </div>

          <Textarea placeholder="..." rows={14} />
        </div>
      ))}
    </div>
  );
};

export default PageAddListing6;
