"use client";
import StayCard from "@/components/StayCard";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Route } from "@/routers/types";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

interface CombinedData {
  propertyType?: string;
  placeName?: string;
  rentalForm?: string;
  numberOfPortions?: number;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  street?: string;
  center?: object;
  roomNumber?: number;
  portionName?: string[];
  portionSize?: number[];
  guests?: number[];
  bedrooms?: number[];
  beds?: number[];
  bathroom?: number[];
  kitchen?: number[];
  childrenAge?: number[];
  basePrice?: number[];
  weekendPrice?: number[];
  monthlyDiscount?: number[];
  currency?: string;
  propertyCoverFileUrl?: string;
  propertyPictureUrls?: string[];
  portionCoverFileUrls?: string[];
  portionPictureUrls?: string[];
  generalAmenities?: object;
  otherAmenities?: object;
  safeAmenities?: object;
  additionalRules?: string[];
  reviews?: string[];
  smoking?: string;
  pet?: string;
  party?: string;
  cooking?: string;
  propertyPictureUrl?: string;
  portionCoverFileUrl?: string;
  portionPictureUrl?: string;
  // isLive: boolean;
}

const PageAddListing10: FC<PageAddListing10Props> = () => {

  const [listingPage, setListingPage] = useState<ListingData>(() => {
    const savedPage = localStorage.getItem("listingData");
    return savedPage
      ? JSON.parse(savedPage)
      : {
          ...DEMO_STAY_LISTINGS[0],
          reviewStart: 0,
        };
  });

  const [propertyCoverFileUrl, setPropertyCoverFileUrl] = useState<string>(
    () => {
      const savedPage = localStorage.getItem("propertyCoverFileUrl") || "";
      return savedPage || "";
    }
  );

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

  const [basePrice, setBasePrice] = useState<number>(() => {
    const saved = localStorage.getItem("page8");
    if (!saved) {
      return 0;
    }
    const value = JSON.parse(saved);
    return parseInt(value.basePrice[0]) || 0;
  });

  const [combinedData, setCombinedData] = useState<CombinedData>(() => ({}));

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const page1 = JSON.parse(localStorage.getItem("page1") || "{}");
      const page2 = JSON.parse(localStorage.getItem("page2") || "{}");
      const page3 = JSON.parse(localStorage.getItem("page3") || "{}");
      const page4 = JSON.parse(localStorage.getItem("page4") || "{}");
      const page5 = JSON.parse(localStorage.getItem("page5") || "{}");
      const page6 = JSON.parse(localStorage.getItem("page6") || "{}");
      // const page7 = JSON.parse(localStorage.getItem('page7') || '{}');
      const page8 = JSON.parse(localStorage.getItem("page8") || "{}");
      const page9 = JSON.parse(localStorage.getItem("page9") || "{}");
      // const propertyCoverFileUrl = JSON.parse(localStorage.getItem('propertyCoverFileUrl') || "");
      const propertyPictureUrls = JSON.parse(
        localStorage.getItem("propertyPictureUrls") || "[]"
      );
      const portionCoverFileUrls = JSON.parse(
        localStorage.getItem("portionCoverFileUrls") || "[]"
      );
      const portionPictureUrls = JSON.parse(
        localStorage.getItem("portionPictureUrls") || "[[]]"
      );

      // Combine all the data from the pages
      const combinedData = {
        ...page1,
        ...page2,
        ...page3,
        // ...page4,
        ...page5,
        ...page6,
        ...page8,
        ...page9,
        propertyCoverFileUrl,
        propertyPictureUrls,
        portionCoverFileUrls,
        portionPictureUrls,
        generalAmenities: page4[0],
        otherAmenities: page4[1],
        safeAmenities: page4[2],
      };
      setCombinedData(combinedData);
      console.log("combined data:",combinedData);
      return combinedData;
    };

    fetchDataFromLocalStorage();
  }, []);

  const handleGoLive = async () => {
    console.log('clicked go live')
    const data = {
      propertyType: combinedData?.propertyType,
      placeName: combinedData?.placeName,
      rentalForm: combinedData?.rentalForm,
      numberOfPortions: combinedData?.numberOfPortions,
      city: combinedData?.city,
      state: combinedData?.state,
      postalCode: combinedData?.postalCode,
      country: combinedData?.country,
      street: combinedData?.street,
      center: combinedData?.center,

      roomNumber: combinedData?.roomNumber,
      portionName: combinedData?.portionName,
      portionSize: combinedData?.portionSize,
      guests: combinedData?.guests,
      bedrooms: combinedData?.bedrooms,
      beds: combinedData?.beds,
      bathroom: combinedData?.bathroom,
      kitchen: combinedData?.kitchen,
      childrenAge: combinedData?.childrenAge,
      basePrice: combinedData?.basePrice,
      weekendPrice: combinedData?.weekendPrice,
      monthlyDiscount: combinedData?.monthlyDiscount,

      currency: combinedData?.currency,

      generalAmenities: combinedData?.generalAmenities,
      otherAmenities: combinedData?.otherAmenities,
      safeAmenities: combinedData?.safeAmenities,

      smoking: combinedData?.smoking,
      pet: combinedData?.pet,
      party: combinedData?.party,
      cooking: combinedData?.cooking,

      additionalRules: combinedData?.additionalRules,
      reviews: combinedData?.reviews,

      propertyCoverFileUrl: combinedData?.propertyCoverFileUrl,
      propertyPictureUrls: combinedData?.propertyPictureUrls,
      portionCoverFileUrls: combinedData?.portionCoverFileUrls,
      portionPictureUrls: combinedData?.portionPictureUrls,
      isLive: true,
    };

    try {
      const response = await axios.post("/api/users", data);
      toast.success('Property is successfully live!');
      console.log('response: ', response);
    } catch (error) {
      // console.error("Failed to save data:", error);
      console.log('error')
      toast.error('Incorrect data');
      throw error;
    }
  };

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
              <h6>
                {page2.city}, {page2.country}
              </h6>
            </div>
            <hr className=" w-16 border-gray-600 boder-2 my-2" />
            <div className=" mt-1 font-medium text-xl ml-2">
              € {basePrice ? basePrice : "--/--"} /night
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-2 mt-8">
          <ButtonSecondary
            href={"/add-listing/1" as Route}
            className=" -ml-1 -p-8"
          >
            <PencilSquareIcon className="h-3 w-3 -ml-4" />
            <span className="ml-3 text-sm">Edit</span>
          </ButtonSecondary>

          <Link href={"/listing-stay-detail"}>
            <ButtonPrimary className="-p-4">
              <EyeIcon className="h-3 w-3 -ml-4" />
              <span className="ml-3 text-sm -p-2   -mr-2">Preview</span>
            </ButtonPrimary>
          </Link>

          {/* <Link href={"/listing-stay-detail"}> */}
            <ButtonSecondary className="-p-4" onClick={handleGoLive}>
              <img
                src="https://img.icons8.com/?size=100&id=fJXFbcW0WrW9&format=png&color=000000"
                alt=""
                className="bg-green-400 w-4 h-4 -ml-4 ronded-xl"
              />
              <span className="ml-3 text-sm -p-2 -mr-4">Go Live</span>
            </ButtonSecondary>
          {/* </Link> */}
        </div>
      </div>
      {/*  */}
      <ToastContainer />
    </>
  );
};

export default PageAddListing10;
