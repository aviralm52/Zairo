"use client";

import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonClose from "@/shared/ButtonClose";
import Input from "@/shared/Input";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Amenities_demos, PHOTOS } from "./constant";
import StayDatesRangeInput from "./StayDatesRangeInput";
import GuestsInput from "./GuestsInput";
import SectionDateRange from "../SectionDateRange";
import { Route } from "next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import page from "@/app/checkout/page";
import { IndexKind, isConstructorDeclaration } from "typescript";
import { useSearchParams } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { FaBath } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Modal from "react-modal";

export interface ListingStayDetailPageProps {
    card: {
        id: number;
        title: string;
        description: string;
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
interface Page8State {
    currency: string;
    isPortion: Boolean;
    basePrice: number[];
    weekendPrice: number[];
    monthlyDiscount: number[];
}

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ card }) => {
    //

    // useEffect(() => {
    //   Modal.setAppElement('#__next'); // Ensure this runs after the component mounts
    // }, []);

    const thisPathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const param = searchParams.get("id") || 0;
    const indexId: number = parseInt(param, 10);

    let portions = 0;
    const data = localStorage.getItem("page1") || "";
    if (data) {
        const value = JSON.parse(data)["numberOfPortions"];
        if (value) {
            portions = parseInt(value, 10);
        }
    }
    let checkPortion = portions > 1 ? portions : 0;
    const [myArray, setMyArray] = useState<number[]>(
        Array(checkPortion).fill(1)
    );

    const [page8, setPage8] = useState<Page8State>(() => {
        const savedPage = localStorage.getItem("page8") || "";
        if (savedPage) {
            return JSON.parse(savedPage);
        }
        return "";
    });

    const [page3, setPage3] = useState<Page3State>(() => {
        const savedPage = localStorage.getItem("page3") || "";
        if (savedPage) {
            return JSON.parse(savedPage);
        }
        return "";
    });

    const [price, setPrice] = useState<number[]>(() => {
        const savedPage = localStorage.getItem("page8") || "";
        if (savedPage) {
            const value = JSON.parse(savedPage);
            return value.basePrice;
        }
        return [0, 0];
    });

    const [selectedDates, setSelectedDates] = useState<DateRange>({
        startDate: null,
        endDate: null,
    });
    const handleDatesChange = (dates: DateRange) => {
        setSelectedDates(dates);
    };

    const [savedDates, setSavedDates] = useState<Date[]>(() => {
        const saved = localStorage.getItem("dates") || "";
        if (saved) {
            const value = JSON.parse(saved);
            const start = new Date(value.startDate);
            const end = new Date(value.endDate);
            // return [value.startDate, value.endDate];
            return [start, end];
        }
        const today = new Date();
        return [today, today];
    });

    const [numberOfNights, setNumberOfNights] = useState<number>(0);
    useEffect(() => {
        if (savedDates[0] && savedDates[1]) {
            const numberOfNights = Math.ceil(
                (savedDates[1].getTime() - savedDates[0].getTime()) /
                    (1000 * 60 * 60 * 24)
            );
            setNumberOfNights(numberOfNights);
        }
    }, [savedDates]);

    const [portionCoverFileUrls, setPortionCoverFileUrls] = useState<string[]>(
        Array(checkPortion).fill("")
    );

    useEffect(() => {
        const savedData = localStorage.getItem("portionCoverFileUrls") || "";
        if (!savedData) {
            setPortionCoverFileUrls(Array(checkPortion).fill(1));
        } else {
            const value = JSON.parse(savedData);
            setPortionCoverFileUrls(value);
        }
        console.log("selectedDates: ", selectedDates, portionCoverFileUrls);
    }, []);

    let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

    function closeModalAmenities() {
        setIsOpenModalAmenities(false);
    }

    function openModalAmenities() {
        setIsOpenModalAmenities(true);
    }

    const handleOpenModalImageGallery = () => {
        router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
    };

    const [location, setLocation] = useState<string[]>(() => {
        const savedPage = localStorage.getItem("page2") || "";
        if (savedPage) {
            const value = JSON.parse(savedPage);
            return [
                value.country,
                value.state,
                value.city,
                value.postalCode,
                value.street,
                value.roomNumber,
            ];
        }
        return ["", "", "", "", "", ""];
    });

    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                {/* 1 */}
                <div className="flex justify-between items-center">
                    <Badge name="Wooden house" />
                    <LikeSaveBtns />
                </div>

                {/* 2 */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    {page3.portionName[indexId]}
                </h2>

                {/* 3 */}
                <div className="flex items-center space-x-4">
                    <StartRating />
                    <span>·</span>
                    <span>
                        <i className="las la-map-marker-alt"></i>
                        <span className="ml-1">
                            {location[2]}, {location[0]}
                        </span>
                    </span>
                </div>

                {/* 4 */}
                <div className="flex items-center">
                    <Avatar
                        hasChecked
                        sizeClass="h-10 w-10"
                        radius="rounded-full"
                    />
                    <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
                        Hosted by{" "}
                        <span className="text-neutral-900 dark:text-neutral-200 font-medium">
                            Kevin Francis
                        </span>
                    </span>
                </div>

                {/* 5 */}
                <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

                {/* 6 */}
                <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center space-x-3 ">
                        <FaUser className="text-2xl" />
                        <h3 className=" text-sm">
                            {page3.guests[indexId]} Guests
                        </h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <IoIosBed className="text-2xl" />
                        <h3 className=" text-sm">
                            {page3.bedrooms[indexId]} Bedrooms
                        </h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaBath className="text-2xl" />
                        <h3 className=" text-sm">
                            {page3.bathroom[indexId]} Bathroom
                        </h3>
                    </div>
                    <div className="flex items-center space-x-3">
                        <SlSizeFullscreen className="text-2xl" />
                        <h3 className=" text-sm">
                            {page3.portionSize[indexId]} sq
                        </h3>
                    </div>
                </div>
            </div>
        );
    };

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [description, setDescription] = useState<string[]>(() => {
        const savedPage = localStorage.getItem("page6") || "";
        if (savedPage) {
            const value = JSON.parse(savedPage);
            return value.reviews;
        }
        const emptyArray = Array(portions).fill("");
        return emptyArray;
    });

    const renderSection2 = () => {
        return (
            <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">Stay information</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300">
                    <span>
                        Providing lake views, The Symphony 9 Tam Coc in Ninh
                        Binh provides accommodation, an outdoor swimming pool, a
                        bar, a shared lounge, a garden and barbecue facilities.
                        Complimentary WiFi is provided.
                    </span>
                    <br />
                    <br />
                    <span>
                        There is a private bathroom with bidet in all units,
                        along with a hairdryer and free toiletries.
                    </span>
                    <br /> <br />
                    <span>
                        The Symphony 9 Tam Coc offers a terrace. Both a bicycle
                        rental service and a car rental service are available at
                        the accommodation, while cycling can be enjoyed nearby.
                    </span>
                </div>
                <div className="relative">
                    <div>
                        <h3
                            className="cursor-pointer text-medium"
                            onClick={() => setIsExpanded((prev) => !prev)}
                        >
                            {!isExpanded && (
                                <h4 className="font-medium underline">
                                    Know more about {page3.portionName[indexId]}
                                </h4>
                            )}
                        </h3>
                    </div>
                    <div>
                        {isExpanded && (
                            <MdCancel
                                className="text-2xl cursor-pointer absolute right-4"
                                onClick={() => setIsExpanded((prev) => !prev)}
                            />
                        )}
                    </div>
                </div>
                {isExpanded && (
                    <div className="">
                        <h2 className=" font-medium text-lg underline">
                            Portion {indexId + 1}
                        </h2>
                        <h3>{description[indexId]}</h3>
                    </div>
                )}
            </div>
        );
    };

    const renderSection3 = () => {
        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl font-semibold">Amenities </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        {` About the property's amenities and services`}
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* 6 */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
                    {Amenities_demos.filter((_, i) => i < 12).map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center space-x-3"
                        >
                            <i className={`text-3xl las ${item.icon}`}></i>
                            <span className=" ">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* ----- */}
                <div className="w-14 border-b border-neutral-200"></div>
                <div>
                    <ButtonSecondary onClick={openModalAmenities}>
                        View more 20 amenities
                    </ButtonSecondary>
                </div>
                {renderMotalAmenities()}
            </div>
        );
    };

    const renderMotalAmenities = () => {
        return (
            <Transition appear show={isOpenModalAmenities} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={closeModalAmenities}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block py-8 h-screen w-full max-w-4xl">
                                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                                    <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                                        <h3
                                            className="text-lg font-medium leading-6 text-gray-900"
                                            id="headlessui-dialog-title-70"
                                        >
                                            Amenities
                                        </h3>
                                        <span className="absolute left-3 top-3">
                                            <ButtonClose
                                                onClick={closeModalAmenities}
                                            />
                                        </span>
                                    </div>
                                    <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                                        {Amenities_demos.filter(
                                            (_, i) => i < 1212
                                        ).map((item) => (
                                            <div
                                                key={item.name}
                                                className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                                            >
                                                <i
                                                    className={`text-4xl text-neutral-6000 las ${item.icon}`}
                                                ></i>
                                                <span>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    const renderSection4 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Room Rates </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Prices may increase on weekends or holidays
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* CONTENT */}
                <div className="flow-root">
                    <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
                        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
                            <span>Monday - Thursday</span>
                            <span>€ {price[indexId]}</span>
                        </div>
                        {/* <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div> */}
                        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
                            <span>Friday - Sunday</span>
                            <span>€ {page8.weekendPrice[indexId]}</span>
                        </div>
                        <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
                            <span>Rent by month</span>
                            <span>-{page8.monthlyDiscount[indexId]} %</span>
                        </div>
                        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
                            <span>Minimum number of nights</span>
                            <span>1 night</span>
                        </div>
                        <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
                            <span>Max number of nights</span>
                            <span>90 nights</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection5 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Host Information</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                {/* host */}
                <div className="flex items-center space-x-4">
                    <Avatar
                        hasChecked
                        hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                        sizeClass="h-14 w-14"
                        radius="rounded-full"
                    />
                    <div>
                        <a className="block text-xl font-medium" href="##">
                            Kevin Francis
                        </a>
                        <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                            <StartRating />
                            <span className="mx-2">·</span>
                            <span> 12 places</span>
                        </div>
                    </div>
                </div>

                {/* desc */}
                <span className="block text-neutral-6000 dark:text-neutral-300">
                    Providing lake views, The Symphony 9 Tam Coc in Ninh Binh
                    provides accommodation, an outdoor swimming pool, a bar, a
                    shared lounge, a garden and barbecue facilities...
                </span>

                {/* info */}
                <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
                    <div className="flex items-center space-x-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>Joined in March 2016</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                        </svg>
                        <span>Response rate - 100%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>Fast response - within a few hours</span>
                    </div>
                </div>

                {/* == */}
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div>
                    <ButtonSecondary href="/author">
                        See host profile
                    </ButtonSecondary>
                </div>
            </div>
        );
    };

    const renderSection6 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                {/* Content */}
                <div className="space-y-5">
                    <FiveStartIconForRate
                        iconClass="w-6 h-6"
                        className="space-x-0.5"
                    />
                    <div className="relative">
                        <Input
                            fontClass=""
                            sizeClass="h-16 px-4 py-3"
                            rounded="rounded-3xl"
                            placeholder="Share your thoughts ..."
                        />
                        <ButtonCircle
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            size=" w-12 h-12 "
                        >
                            <ArrowRightIcon className="w-5 h-5" />
                        </ButtonCircle>
                    </div>
                </div>

                {/* comment */}
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    <CommentListing className="py-8" />
                    <CommentListing className="py-8" />
                    <CommentListing className="py-8" />
                    <CommentListing className="py-8" />
                    <div className="pt-8">
                        <ButtonSecondary>View more 20 reviews</ButtonSecondary>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection7 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Location</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        {location[2]}, {location[1]}, {location[0]}
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                {/* MAP */}
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
                    <div className="rounded-xl overflow-hidden z-0">
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    };

    const [time, setTime] = useState<number[]>(() => {
        const savedPage = localStorage.getItem("page9") || "";
        if (!savedPage) {
            return [10, 12];
        }
        const value = JSON.parse(savedPage)["time"];
        return value || [10, 12];
    });

    const [additionalRules, setAdditionalRules] = useState<string[]>(() => {
        const savedPage = localStorage.getItem("page5") || "";
        if (!savedPage) {
            return [];
        }
        const value = JSON.parse(savedPage)["additionalRules"];
        return value || [];
    });

    const renderSection8 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Things to know</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">
                        Cancellation policy
                    </h4>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                        Refund 50% of the booking value when customers cancel
                        the room within 48 hours after successful booking and 14
                        days before the check-in time. <br />
                        Then, cancel the room 14 days before the check-in time,
                        get a 50% refund of the total amount paid (minus the
                        service fee).
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Check-in time</h4>
                    <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
                        <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <span>Check-in</span>
                            <span>{time[0]}:00 am</span>
                        </div>
                        <div className="flex space-x-10 justify-between p-3">
                            <span>Check-out</span>
                            <span>{time[1]}:00 pm</span>
                        </div>
                    </div>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold">Special Note</h4>
                    <div className="prose sm:prose">
                        <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                            {additionalRules.map((rule, index) => {
                                return <li key={index}>{rule}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const [totalGuests, setTotalGuests] = useState<number>(() => {
        const savedValue = localStorage.getItem("totalGuests") || "";
        if (savedValue) {
            const total = JSON.parse(savedValue);
            return total;
        }
        return 0;
    });
    const handleGuestChange = (totalGuests: number) => {
        setTotalGuests(totalGuests);
    };

    const renderSidebar = () => {
        return (
            <div className="listingSectionSidebar__wrap shadow-xl ">
                {/* PRICE */}
                <div className="flex justify-between">
                    <span className="text-3xl font-semibold">
                        € {price[indexId]}
                        <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                            /night
                        </span>
                    </span>
                    <StartRating />
                </div>

                {/* FORM */}
                <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
                    <StayDatesRangeInput
                        className="flex-1 z-[11]"
                        onDatesChange={handleDatesChange}
                    />
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700 "></div>
                    <GuestsInput
                        className="flex-1"
                        onGuestsChange={handleGuestChange}
                    />
                </form>

                {/* SUM */}
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>
                            € {price[indexId]} x {numberOfNights} nights
                        </span>
                        <span>€ {price[indexId] * numberOfNights}</span>
                    </div>
                    <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                        <span>Service charge</span>
                        <span>€ 0</span>
                    </div>
                    <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>€ {price[indexId] * numberOfNights}</span>
                    </div>
                </div>

                {/* SUBMIT */}
                <ButtonPrimary href={"/checkout"}>Reserve</ButtonPrimary>
            </div>
        );
    };

    let sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
    };

    const [clicked, setClicked] = useState<boolean[]>(
        Array(portions).fill(false)
    );

    const handleLike = (index: number) => {
        const newLike = [...clicked];
        newLike[index] = !clicked[index];
        setClicked(newLike);
    };

    const renderPortionCards = () => {
        return (
            <Slider {...sliderSettings} className=" h-[440px]">
                {myArray.map((item, index) => (
                    <div
                        key={index}
                        className=" w-[250px] h-[380px] rounded-3xl first:ml-4 flex-shrink-0 m-4 shadow-sm shadow-slate-400 border-1 border-slate-500"
                    >
                        <div className="h-52 flex justify-center rounded-3xl overflow-hidden flex-wrap relative">
                            {page8?.monthlyDiscount ? (
                                <div className=" absolute bg-red-600 text-white font-medium rounded-xl mx-4 my-2 text-xs p-1 left-1">
                                    -{page8.monthlyDiscount[index]}% today
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <FaHeart
                                className={`absolute text-2xl right-4 top-2 cursor-pointer ${
                                    clicked[index] ? "text-red-500" : ""
                                }`}
                                onClick={(e) => handleLike(index)}
                            />
                            <Link
                                href={{
                                    pathname: "/listing-stay-detail",
                                    query: { id: index },
                                }}
                                key={index}
                            >
                                <img
                                    src={
                                        portionCoverFileUrls[index]
                                            ? portionCoverFileUrls[index]
                                            : ""
                                    }
                                    alt="No image"
                                    className="fill w-56 h-48"
                                />
                            </Link>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <div className="flex gap-2 items-center">
                                <FaUser className="text-md" />
                                <h3 className=" text-sm">
                                    {page3.guests[index]}
                                </h3>
                            </div>
                            <div className="flex gap-2 items-center">
                                <IoIosBed className="text-md" />
                                <h3 className=" text-sm">
                                    {page3.bedrooms[index]}
                                </h3>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaBath className="text-md" />
                                <h3 className=" text-sm">
                                    {page3.bathroom[index]}
                                </h3>
                            </div>
                            <div className="flex gap-2 items-center">
                                <SlSizeFullscreen className="text-md" />
                                <h3 className=" text-sm">
                                    {page3.portionSize[index]} sq
                                </h3>
                            </div>
                        </div>
                        <div>
                            <h2 className="ml-6 mt-2 text-lg font-medium">
                                Portion {index + 1}
                            </h2>
                        </div>
                        <div className=" h-0.5 w-12 bg-slate-600 rounded-xl ml-4 mt-4"></div>
                        <div>
                            <h2 className="text-xl font-bold ml-4 mt-4">
                                {" "}
                                € {page8.basePrice[index]} /night
                            </h2>
                        </div>
                    </div>
                ))}
            </Slider>
        );
    };

    const [allImages, setAllImages] = useState<string[]>(() => {
        const propertyCoverFileUrl = localStorage.getItem(
            "propertyCoverFileUrl"
        );
        const portionCoverFileUrls = JSON.parse(
            localStorage.getItem("portionCoverFileUrls") || ""
        );
        const propertyPictureUrls = JSON.parse(
            localStorage.getItem("propertyPictureUrls") || ""
        );
        const portionPictureUrls = JSON.parse(
            localStorage.getItem("portionPictureUrls") || ""
        );
        const allImagesArray = [
            propertyCoverFileUrl,
            portionCoverFileUrls,
            propertyPictureUrls,
            portionPictureUrls,
        ];
        const arr = allImagesArray
            .flat(Infinity)
            .filter((item) => item !== null && item !== "");
        return arr;
    });

    const allImagesParam: string = searchParams.get("allImages") || "";
    const imageCarousel = () => {
        return (
            <Carousel>
                {allImages
                    .filter((_, i) => i >= 1)
                    .map((item, index) => (
                        <div key={index}>
                            <img
                                src={item}
                                alt=""
                                className="w-16 h-80 rounded-xl"
                            />
                        </div>
                    ))}
            </Carousel>
        );
    };

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const modalImages = () => {
        return (
            // <Transition appear show={modalIsOpen} as={Fragment}>
            //   <Dialog
            //     as="div"
            //     className="fixed inset-0 z-50 overflow-y-hidden"
            //     onClose={() => setModalIsOpen(false)}
            //   >
            //     <div className="min-h-screen px-4 text-center">
            //       <Transition.Child
            //         as={Fragment}
            //         enter="ease-out duration-300"
            //         enterFrom="opacity-0"
            //         enterTo="opacity-100"
            //         leave="ease-in duration-200"
            //         leaveFrom="opacity-100"
            //         leaveTo="opacity-0"
            //       >
            //         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            //       </Transition.Child>

            //       {/* This element is to trick the browser into centering the modal contents. */}
            //       <span
            //         className="inline-block h-screen align-middle"
            //         aria-hidden="true"
            //       >
            //         &#8203;
            //       </span>
            //       <Transition.Child
            //         as={Fragment}
            //         enter="ease-out duration-300"
            //         enterFrom="opacity-0 scale-95"
            //         enterTo="opacity-100 scale-100"
            //         leave="ease-in duration-200"
            //         leaveFrom="opacity-100 scale-100"
            //         leaveTo="opacity-0 scale-95"
            //       >
            //         <div className="inline-block py-8 h-screen w-full max-w-4xl">
            //           <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
            //             <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
            //               <h3
            //                 className="text-lg font-medium leading-6 text-gray-900"
            //                 id="headlessui-dialog-title-70"
            //               >
            //                 Images
            //               </h3>
            //               <span className="absolute left-3 top-3">
            //                 <ButtonClose onClick={() => setModalIsOpen(false)} />
            //               </span>
            //             </div>
            //             <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
            //               {imageCarousel()}
            //             </div>
            //           </div>
            //         </div>
            //       </Transition.Child>
            //     </div>
            //   </Dialog>
            // </Transition>

            <Transition appear show={modalIsOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={() => setModalIsOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center flex items-center justify-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="w-3/4 max-w-4xl h-4/5 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl rounded-2xl overflow-hidden flex flex-col">
                                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                                    <h3
                                        className="text-lg font-medium leading-6 text-gray-900"
                                        id="headlessui-dialog-title-70"
                                    >
                                        Images
                                    </h3>
                                    <span className="absolute left-3 top-3">
                                        <ButtonClose
                                            onClick={() =>
                                                setModalIsOpen(false)
                                            }
                                        />
                                    </span>
                                </div>
                                <div className="flex-grow overflow-auto px-8 py-4 text-neutral-700 dark:text-neutral-300">
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        {allImages
                                            .filter(
                                                (_, i) => i >= 1 && i < 1212
                                            ) // Assuming this is to limit the number of images displayed
                                            .map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center py-2.5 space-x-5"
                                                >
                                                    <div className="rounded-xl border border-slate-700">
                                                        <a href={item} target="_blank">
														<img
                                                            src={item}
                                                            alt=""
                                                            className="w-64 h-64 rounded-xl"
                                                        />
														</a>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            //   <Transition appear show={isOpenModalAmenities} as={Fragment}>
            //   <Dialog
            //     as="div"
            //     className="fixed inset-0 z-50 overflow-y-auto"
            //     onClose={closeModalAmenities}
            //   >
            //     <div className="min-h-screen px-4 text-center">
            //       <Transition.Child
            //         as={Fragment}
            //         enter="ease-out duration-300"
            //         enterFrom="opacity-0"
            //         enterTo="opacity-100"
            //         leave="ease-in duration-200"
            //         leaveFrom="opacity-100"
            //         leaveTo="opacity-0"
            //       >
            //         <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            //       </Transition.Child>

            //       {/* This element is to trick the browser into centering the modal contents. */}
            //       <span
            //         className="inline-block h-screen align-middle"
            //         aria-hidden="true"
            //       >
            //         &#8203;
            //       </span>
            //       <Transition.Child
            //         as={Fragment}
            //         enter="ease-out duration-300"
            //         enterFrom="opacity-0 scale-95"
            //         enterTo="opacity-100 scale-100"
            //         leave="ease-in duration-200"
            //         leaveFrom="opacity-100 scale-100"
            //         leaveTo="opacity-0 scale-95"
            //       >
            //         <div className="inline-block py-8 h-screen w-full max-w-4xl">
            //           <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
            //             <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
            //               <h3
            //                 className="text-lg font-medium leading-6 text-gray-900"
            //                 id="headlessui-dialog-title-70"
            //               >
            //                 Images
            //               </h3>
            //               <span className="absolute left-3 top-3">
            //                 <ButtonClose onClick={closeModalAmenities} />
            //               </span>
            //             </div>
            //             <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
            //               {allImages.filter((_, i) =>  i>=1 && i < 1212).map((item, index) => (
            //                 <div
            //                   key={index}
            //                   className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
            //                 >
            //                   <i
            //                     className={`text-4xl text-neutral-6000 las ${item.icon}`}
            //                   ></i>
            //                   <span>{item.name}</span>
            //                 </div>
            //               ))}
            //             </div>
            //           </div>
            //         </div>
            //       </Transition.Child>
            //     </div>
            //   </Dialog>
            // </Transition>
        );
    };

    return (
        <div className={`nc-ListingStayDetailPage ${modalIsOpen ? "blur-md" : ""}`}>
            {/*  HEADER */}

            <header className="rounded-md sm:rounded-xl h-[60%]">
                <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2 ">
                    <div className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden">
                        <img src={allImages[0]} alt="" className=" object-cover "/>
                    </div>
                    {allImages
                        .filter((_, i) => i >= 1 && i < 5)
                        .map((item, index) => (
                            <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5 rounded-xl">
                                <img
                                    src={allImages[index]}
                                    alt=""
                                    className="object-cover rounded-xl sm:rounded-xl w-44 h-44 "
                                />
                            </div>
                        ))}
                    <button
                        className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
                        onClick={() => setModalIsOpen(true)}
                    >
                        <Squares2X2Icon className="w-5 h-5" />
                        <span className="ml-2 text-neutral-800 text-sm font-medium">
                            Show all photos
                        </span>
                    </button>
                </div>
            </header>

            {modalIsOpen ? modalImages() : ""}

            {/* MAIN */}
            <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
                {/* CONTENT */}
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
                    {renderSection1()}
                    {renderSection2()}
                    {renderSection3()}
                    {renderSection4()}
                    <SectionDateRange />
                    {checkPortion > 0 && renderPortionCards()}
                    {renderSection5()}
                    {/* {renderSection6()} */}
                    {renderSection7()}
                    {renderSection8()}
                </div>

                {/* SIDEBAR */}
                <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
                    <div className="sticky top-28">{renderSidebar()}</div>
                </div>
            </main>
        </div>
    );
};

export default ListingStayDetailPage;
