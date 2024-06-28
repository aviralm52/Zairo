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

interface Page3State {
  portionName: string[];
  portionSize: number[];
  guests: number[];
  bedrooms: number[];
  beds: number[];
  bathroom: number[];
  kitchen: number[];
}

interface Page2State {
  country: string;
  street: string;
  roomNumber: string;
  city: string;
  state: string;
  postalCode: string;
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

  const [propertyCoverFileUrl, setPropertyCoverFileUrl] = useState<string>(() => {
    const savedPage = localStorage.getItem("propertyCoverFileUrl") || "";
    return savedPage || "";
  });

  const [page3, setPage3] = useState<Page3State>(() => {
    const savedPage = localStorage.getItem("page3") || "";
    if (savedPage) {
      return JSON.parse(savedPage);
    }
    return "";
  });

  const [page2, setPage2] = useState<Page2State>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (savedPage) {
      return JSON.parse(savedPage);
    }
    return "";
  }); 

  const [basePrice, setBasePrice] = useState<number> (() => {
    const saved = localStorage.getItem('page8');
    if (!saved){
      return 0;
    }
    const value = JSON.parse(saved);
    return parseInt(value.basePrice[0]) || 0;
  })

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
        <h3 className="text-lg font-semibold mb-4">This is your listing</h3>
        {/* <div className="max-w-xs">
          <StayCard
            className="mt-8"
            data={{ ...DEMO_STAY_LISTINGS[0], reviewStart: 0 }}
          />
        </div> */}

        <Link href={"/listing-stay-detail"}>
        <div
          className="card"
          style={{
            width: "15rem",
            border: "1px solid gray",
            borderRadius: "10px",
            height: "22rem",
          }}
        >
          <img
            src={propertyCoverFileUrl}
            className="card-img-top h-56 w-96 rounded-xl"
            alt="..."
          />
          <div className="card-body mt-2 ml-2">
            <h1 className="mt-2">{page3.portionName[0]}</h1>
          </div>
          <div className="flex gap-2 ml-2 mt-2 items-center">
            <FaLocationDot />
            <h6>{page2.city}, {page2.country}</h6>
          </div>
          <hr className=" w-16 border-gray-600 boder-2 my-2"/>
          <div className=" mt-1 font-medium text-xl ml-2">
            € {basePrice ? basePrice : "--/--"} /night
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
              <span className="ml-3 text-sm -p-2   -mr-2">Preview</span>
            </ButtonPrimary>
          </Link>

          <Link href={"/listing-stay-detail"}>
            <ButtonSecondary className="-p-4">
              <img src="https://img.icons8.com/?size=100&id=fJXFbcW0WrW9&format=png&color=000000" alt="" className="bg-green-400 w-4 h-4 -ml-4 ronded-xl" />
              <span className="ml-3 text-sm -p-2 -mr-4">Go Live</span>
            </ButtonSecondary>
          </Link>

        </div>
      </div>
      {/*  */}
    </>
  );
};

export default PageAddListing10;
