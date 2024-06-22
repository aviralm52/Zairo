"use client";
import { useEffect, useState } from "react";
import React, { FC } from "react";
import ImageUpload from "./uploadImage";
import axios from "axios";
import { MdCancel } from "react-icons/md";

export interface PageAddListing7Props {}

const PageAddListing7: FC<PageAddListing7Props> = () => {
  let PartitionValueinPage7 = 0;
  const [myArray, setMyArray] = useState<number[]>([]);

  useEffect(() => {
    const storedValue = localStorage.getItem("numberOfPartition");
    if (storedValue) {
      PartitionValueinPage7 = parseInt(storedValue);
      const newArray = Array(PartitionValueinPage7).fill(1);
      setMyArray(newArray);
    }
  }, []);

  const storedValue = localStorage.getItem("numberOfPartition");
  if (storedValue) {
    PartitionValueinPage7 = parseInt(storedValue);
  }
  const booleanArray = Array.from(
    { length: PartitionValueinPage7 },
    () => false
  );
  const emptyStringArray = Array.from(
    { length: PartitionValueinPage7 },
    () => ""
  );

  // TODO: files array
  const [fileUrls, setFileUrls] = useState<string[]>(emptyStringArray);
  console.log("fileUrls: ",fileUrls)

  // TODO: File upload to cloudinary
  const [isImages, setIsImages] = useState<boolean[]>(booleanArray);
  const preset_key = "CoverImage";
  const cloud_name = "dkfwmyr2k";

  const uploadFile = async (event: any, index: number) => {
    console.log("index: ", index);
    const file = event?.target.files[0];
    console.log("files: ", event?.target.files);

    const folderPath = "/Cover_Image";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    formData.append("folder", folderPath);
    const folder = "Zairo";

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    const customUrl = response.data.secure_url + `/index=${index}`;
    console.log("url: ", response.data.secure_url, "\n", customUrl);
    setFileUrls((prevState) => {
      const newUrls = [...prevState];
      newUrls[index] = response?.data.secure_url;
      return newUrls;
    });
    console.log("files: ", event?.target.files);

    // ! updating boolen array of images
    setIsImages((prevState) => {
      const newImages = [...prevState];
      newImages[index] = true;
      return newImages;
    });
    console.log("url: ", response.data.secure_url, "\n", customUrl, fileUrls);
  };

  // TODO: Handling click on cross of uploaded image
  // const handleClickOnCross = (index: number) => {
  //   setIsImages((prev) => [
  //     ...prev.slice(0, index),
  //     false,
  //     ...prev.slice(index + 1, prev.length),
  //   ])

  //   setFileUrls((prev) => [
  //     ...prev.slice(0, index),
  //     "",
  //     ...prev.slice(index + 1, prev.length),
  //   ]);
  // }

  useEffect(() => {
    console.log("fileUrls: ", fileUrls)
  }, [fileUrls]);

  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(({ quota, usage }) => {
      console.log(`Quota: ${quota} bytes`);
      console.log(`Usage: ${usage} bytes`);
    });
  } else {
    console.log("Storage API not supported.");
  }

  return (
    <div className="flex flex-col gap-20">


<div className="space-y-8">
            <div>
              <span className="text-lg font-semibold">Cover image Of the place</span>
              <div>
                <h1>Image Upload</h1>
              </div>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                  <div className="space-y-1 text-center flex flex-col items-center">
                    {!isImages[0] ? (
                      <svg
                        className="mx-auto h-12 w-12 text-neutral-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    ) : (
                      <div>
                        <MdCancel
                          className=" text-right ml-auto text-xl cursor-pointer"
                          // onClick={() =>
                          //   setIsImages((prev) => [
                          //     ...prev.slice(0, index),
                          //     false,
                          //     ...prev.slice(index + 1, prev.length),
                          //   ])
                          // }
                          // onClick={handleClickOnCross}
                        />
                        <div className="flex flex-wrap gap-2">
                          {/* <img
                            src={fileUrls[index]}
                            className="w-408 h-48 object-contain rounded-lg"
                          /> */}
                        </div>
                      </div>
                    )}
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor={`file-upload`}
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span className="text-center">Upload a file</span>
                        <input
                          id={`file-upload`}
                          name={`file-upload`}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          // onClick={(e) => uploadFile(e, index)}
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ---------------- */}
            <div>
              <span className="text-lg font-semibold">
                Pictures of the place
              </span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload-2"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span className=" text-center">Upload a file</span>
                        <input
                          id="file-upload-2"
                          name="file-upload-2"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>





      {myArray.map((item, index) => (
        <div key={index}>
          <div>
            <h2 className="text-2xl font-semibold">
              <span>{index}</span>Pictures of the place
            </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              A few beautiful photos will help customers have more sympathy for
              your property.
            </span>
          </div>

          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          <div className="space-y-8">
            <div>
              <span className="text-lg font-semibold">Cover image</span>
              <div>
                <h1>Image Upload</h1>
              </div>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                  <div className="space-y-1 text-center flex flex-col items-center">
                    {!isImages[index] ? (
                      <svg
                        className="mx-auto h-12 w-12 text-neutral-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    ) : (
                      <div>
                        <MdCancel
                          className=" text-right ml-auto text-xl cursor-pointer"
                          onClick={() =>
                            setIsImages((prev) => [
                              ...prev.slice(0, index),
                              false,
                              ...prev.slice(index + 1, prev.length),
                            ])
                          }
                          // onClick={handleClickOnCross}
                        />
                        <div className="flex flex-wrap gap-2">
                          <img
                            src={fileUrls[index]}
                            className="w-408 h-48 object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor={`file-upload-${index}`}
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>{index}</span>
                        <span className="text-center">Upload a file</span>
                        <input
                          id={`file-upload-${index}`}
                          name={`file-upload-${index}`}
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => uploadFile(e, index)}
                          // onClick={(e) => uploadFile(e, index)}
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ---------------- */}
            <div>
              <span className="text-lg font-semibold">
                Pictures of the Portions
              </span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload-2"
                        className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span className=" text-center">Upload a file</span>
                        <input
                          id="file-upload-2"
                          name="file-upload-2"
                          type="file"
                          className="sr-only"
                          onChange={(e) => uploadFile(e, index)}
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageAddListing7;
