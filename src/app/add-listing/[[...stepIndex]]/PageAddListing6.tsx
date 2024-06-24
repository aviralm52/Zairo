"use client";
import React, { FC } from "react";
import Textarea from "@/shared/Textarea";
import { useEffect, useState } from "react";

export interface PageAddListing6Props {}

interface Page6State {
  reviews: string[];
}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  let portions = 0;
  const [myArray, setMyArray] = useState<number[]>([]);

  useEffect(() => {
    const storedValue = localStorage.getItem("page1") || "";
    const data = JSON.parse(storedValue);
    const value = data["numberOfPortions"];
    if (value) {
      portions = parseInt(value);
      if (portions > 1) {
        const newArray = Array(portions).fill(1);
        setMyArray(newArray);
      }
    }
  }, []);

  const [reviews, setReviews] = useState<string[]>(() => {
    const savedPage = localStorage.getItem("page6") || "";
    if (!savedPage) {
      return [];
    }
    const value = JSON.parse(savedPage)["reviews"];
    return value || [];
  });

  const [page6, setPage6] = useState<Page6State>({
    reviews: reviews
  });


  useEffect(() => {
    const newReviews: Page6State = {
      reviews: reviews
    }
    setPage6(newReviews);
    localStorage.setItem("page6", JSON.stringify(newReviews));
  }, [reviews])


  return (
    <div className=" flex flex-col gap-8">
      {myArray.map((item, index) => (
        <div key={index}>
          <div>
            <h2 className="text-2xl font-semibold">
              Portion {index + 1}
            </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Mention the best features of your accommodation, any special
              amenities like fast Wi-Fi or parking, as well as things you like
              about the neighborhood.
            </span>
          </div>

          <Textarea placeholder="Enter your reviews" rows={14} value={reviews[index]} onChange={(e) => setReviews((prev) => {
            const newReviews = [...prev];
            newReviews[index] = e.target.value;
            return newReviews;
          })} />
        </div>
      ))}
    </div>
  );
};

export default PageAddListing6;
