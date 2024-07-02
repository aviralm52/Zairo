"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
import LocationMarker from "@/components/AnyReactComponent/LocationMarker";
import Label from "@/components/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useEffect, useRef, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import axios from "axios";
import AutocompleteInput from "@/components/AutoCompleteInput";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library, Loader } from "@googlemaps/js-api-loader";
import { P } from "@clerk/clerk-react/dist/controlComponents-CzpRUsyv";

export interface PageAddListing2Props {}

interface Page2State {
  country: string;
  street: string;
  roomNumber: string;
  city: string;
  state: string;
  postalCode: string;
}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const [country, setCountry] = useState<string>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (!savedPage) {
      return "Viet Nam";
    }
    const value = JSON.parse(savedPage)["country"];
    return value || "Viet Nam";
  });

  const [street, setStreet] = useState<string>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (!savedPage) {
      return "";
    }
    const value = JSON.parse(savedPage)["street"];
    return value || "";
  });

  const [roomNumber, setRoomNumber] = useState<string>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (!savedPage) {
      return "";
    }
    const value = JSON.parse(savedPage)["roomNumber"];
    return value || "";
  });

  const [city, setCity] = useState<string>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (!savedPage) {
      return "";
    }
    const value = JSON.parse(savedPage)["city"];
    return value || "";
  });

  const [state, setState] = useState<string>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (!savedPage) {
      return "";
    }
    const value = JSON.parse(savedPage)["state"];
    return value || "";
  });

  const [postalCode, setPostalCode] = useState<string>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (!savedPage) {
      return "";
    }
    const value = JSON.parse(savedPage)["postalCode"];
    return value || "";
  });

  const [page2, setPage2] = useState<Page2State>({
    country: country,
    street: street,
    roomNumber: roomNumber,
    city: city,
    state: state,
    postalCode: postalCode,
  });

  const [center, setCenter] = useState({
    lat: 55.9607377,
    lng: 36.2172614,
  });

  useEffect(() => {
    const newPage2: Page2State = {
      country: country,
      street: street,
      roomNumber: roomNumber,
      city: city,
      state: state,
      postalCode: postalCode,
    };
    setPage2(newPage2);
    localStorage.setItem("page2", JSON.stringify(newPage2));
  }, [country, street, roomNumber, city, state, postalCode]);

  const handleSearchLocation = async () => {
    const address = `${page2.postalCode}, ${page2.city}, ${page2.state}, ${page2.country}`;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_GEOCODING_API_KEY`
    );
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      setCenter({ lat, lng });
    }
  };

  const handleLocation = async () => {
    console.log("handleLocation");
    await fetch("https://autocomplete.search.hereapi.com/v1/autocomplete").then(
      (response) => console.log("fetched: ", response.json())
    );
  };

  const libs: Library[] = ["core", "maps", "places", "marker"];
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
    googleMapsApiKey: "AIzaSyAaskQPUlQLG290XRBIGYmp9OGEbPCEdSQ",
    libraries: libs,
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const placeAutoCompleteRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          lat: center.lat,
          lng: center.lng,
          // lat: '10.531020008464978',
          // long: '9.298553466796875'
        },
        zoom: 17,
        mapId: "MY-MAP-1234",
      };

      //setup the map
      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );
      setMap(gMap);

      //setup the autocomplete
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current as HTMLInputElement
      );
      setAutoComplete(gAutoComplete);
    }
  }, [isLoaded]);

  return (
    <>
      <Input ref={placeAutoCompleteRef} />
      <h2>this </h2>
      {/* <h1>Place Autocomplete</h1> */}
      {/* <AutocompleteInput /> */}

      <h2 className="text-2xl font-semibold">Your place location</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        <ButtonSecondary>
          <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          <span className="ml-3">Use current location</span>
        </ButtonSecondary>
        {/* ITEM */}
        <FormItem label="Country/Region">
          <Select onChange={(e) => setCountry(e.target.value)} value={country}>
            <option value="India">India</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Thailand">Thailand</option>
            <option value="France">France</option>
            <option value="Singapore">Singapore</option>
            <option value="Japan">Japan</option>
            <option value="Korea">Korea</option>
          </Select>
        </FormItem>
        <FormItem label="Street">
          <Input
            placeholder="..."
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              handleSearchLocation();
            }}
          />
        </FormItem>
        <FormItem label="Room number (optional)">
          <Input
            value={roomNumber}
            onChange={(e) => {
              setRoomNumber(e.target.value);
              handleSearchLocation();
            }}
          />
        </FormItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <FormItem label="City">
            <Input
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                handleSearchLocation();
              }}
            />
          </FormItem>
          <FormItem label="State">
            <Input
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                handleSearchLocation();
              }}
            />
          </FormItem>
          <FormItem label="Postal code">
            <Input
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
                handleSearchLocation();
              }}
            />
          </FormItem>
          {/* <label htmlFor="">Location Details</label>
          <input type="text" name="" id="" onChange={handleLocation} /> */}
        </div>
        <div>
          <Label>Detailed address</Label>
          <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            1110 Pennsylvania Avenue NW, Washington, DC 20230
          </span>
          <div className="mt-4">
            <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
              <div className="rounded-xl overflow-hidden">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
                  }}
                  yesIWantToUseGoogleMapApiInternals
                  defaultZoom={15}
                  defaultCenter={{
                    // lat: 55.9607377,
                    // lng: 36.2172614,
                    lat: center.lat,
                    lng: center.lng,
                  }}
                >
                  <LocationMarker lat={55.9607277} lng={36.2172614} />
                </GoogleMapReact>
                {isLoaded ? (
                  <div className=" h-96" ref={mapRef}></div>
                ) : (
                  <p> Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing2;
