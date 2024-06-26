"use client";
import StayCard from "@/components/StayCard";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Route } from "@/routers/types";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

export interface PageAddListing10Props {}

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

interface publishPageState {
  id: string;
  saleOff: string;
  isAds: string;
  author: string;
  listingCategory: string;
  href: string;
}

const PageAddListing10: FC<PageAddListing10Props> = () => {
  const [publishPage, setPublishPage] = useState<publishPageState>(() => {
    const savedPage = localStorage.getItem("publishPage");
    const page8 = JSON.parse(localStorage.getItem("page8") || "");
    return savedPage
      ? JSON.parse(savedPage)
      : {
          id: "id101",
          saleOff: `${page8.monthlyDiscount[0]}% today` || "-10% today",
          isAds: "yes",
          author: "username",
          listingCategory: "category",
          href: "route",
        };
  });

  const [listingPage, setListingPage] = useState<ListingData>(() => {
    const savedPage = localStorage.getItem("listingData");
    return savedPage
      ? JSON.parse(savedPage)
      : {
          ...DEMO_STAY_LISTINGS[0],
          reviewStart: 0,
        };
  });

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Excellent, congratulations on completing the listing, it is waiting to
          be reviewed for publication
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div>
        <h3 className="text-lg font-semibold">This is your listing</h3>
        <div className="max-w-xs">
          <StayCard
            className="mt-8"
            data={{ ...DEMO_STAY_LISTINGS[0], reviewStart: 0 }}
          />
        </div>

        <Link href={"/listing-stay-detail"}>
        <div
          className="card"
          style={{
            width: "18rem",
            border: "1px solid gray",
            borderRadius: "10px",
            height: "20rem",
          }}
        >
          <img
            src={listingPage.featuredImage}
            className="card-img-top h-60 w-96 rounded-xl"
            alt="..."
          />
          <div className="card-body mt-2 ml-2">
            <h1 className="mt-2">{listingPage.title}</h1>
          </div>
          <div className="flex gap-2 ml-2 mt-2">
            <FaLocationDot />
            <h6>{listingPage.address}</h6>
          </div>
        </div>
        </Link>

        <div className="flex items-center space-x-2 mt-8">
          <ButtonSecondary href={"/add-listing/1" as Route} className=" -ml-1 -p-8">
            <PencilSquareIcon className="h-3 w-3 -ml-4" />
            <span className="ml-3 text-sm">Edit</span>
          </ButtonSecondary>

          <Link href={"/listing-stay-detail"}>
            <ButtonPrimary className="-p-4">
              <EyeIcon className="h-3 w-3 -ml-4" />
              <span className="ml-3 text-sm -p-2 -ml-1 -mr-2">Preview</span>
            </ButtonPrimary>
          </Link>

          <Link href={"/listing-stay-detail"}>
            <ButtonSecondary className="-p-4">
              <img src="https://img.icons8.com/?size=100&id=fJXFbcW0WrW9&format=png&color=000000" alt="" className="bg-green-400 w-4 h-4 -ml-4 ronded-xl" />
              <span className="ml-3 text-sm -p-2 -ml-1 -mr-4">Go Live</span>
            </ButtonSecondary>
          </Link>

        </div>
      </div>
      {/*  */}
    </>
  );
};

export default PageAddListing10;
