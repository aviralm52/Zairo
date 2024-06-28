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
      if (PartitionValueinPage7 > 1) {
        const newArray = Array(PartitionValueinPage7).fill(1);
        setMyArray(newArray);
      }
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
  // const emptyStringArray = Array.from(
  //   { length: PartitionValueinPage7 },
  //   () => ""
  // );
  // const booleanArrayGenerator = (size: number) => {
  //   const booleanArray = Array.from(
  //     { length: size },
  //     () => false
  //   );
  //   return booleanArray;
  // }
  const emptyStringArrayGenerator = (size: number) => {
    const emptyStringArray = Array.from({ length: size }, () => "");
    return emptyStringArray;
  };

  // TODO: States for property and portion images
  const [portionCoverFileUrls, setPortionCoverFileUrls] = useState<string[]>(
    emptyStringArrayGenerator(PartitionValueinPage7)
  );
  const [propertyCoverFileUrl, setPropertyCoverFileUrl] = useState<string>("");
  const [portionPictureUrls, setPortionPictureUrls] = useState<string[][]>([]);
  const [PropertyPictureUrls, setPropertyPictureUrls] = useState<string[]>(
    emptyStringArrayGenerator(5)
  );

  const [isPropertyPictures, setIsPropertyPictures] = useState<boolean>(false);
  const [isPortionPictures, setIsPortionPictures] =
    useState<boolean[]>(booleanArray);
  //TODO: initialising portionCoverFileUrls of partitionSizeLength & each partion has 5 images
  const emptyArrayOf5 = emptyStringArrayGenerator(5);
  const newArray = Array.from(
    { length: PartitionValueinPage7 },
    () => emptyArrayOf5
  );
  useEffect(() => {
    setPortionPictureUrls(newArray);
  }, []);
  // console.log("portionCoverFileUrls: ",portionCoverFileUrls)

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
    setPortionCoverFileUrls((prevState) => {
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
    console.log(
      "url: ",
      response.data.secure_url,
      "\n",
      customUrl,
      portionCoverFileUrls
    );
  };

  const uploadPropertyCoverFile = async (event: any) => {
    const file = event?.target.files[0];

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
    setPropertyCoverFileUrl(response.data.secure_url);
  };

  const uploadPortionPictures = async (event: any, index: number) => {
    console.log("portion", index);
    const files = event?.target.files;
    const folderPath = "/Cover_Image";
    const formData = new FormData();
    for (let i = 0; i < 5; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", preset_key);
      formData.append("folder", folderPath);
      const folder = "Zairo";
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      setPortionPictureUrls((prevState) => {
        const newUrls = [...prevState];
        newUrls[index][i] = response.data.secure_url;
        return newUrls;
      });

      // ! updating boolen array of images
      setIsPortionPictures((prevState) => {
        const newImages = [...prevState];
        newImages[index] = true;
        return newImages;
      });
      console.log("portition pictures url: ", portionPictureUrls);
    }
  };

  const uploadPropertyPictures = async (event: any) => {
    const files = event?.target.files;
    const folderPath = "/Cover_Image";
    const formData = new FormData();
    for (let i = 0; i < 5; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", preset_key);
      formData.append("folder", folderPath);
      const folder = "Zairo";
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );

      setPropertyPictureUrls((prevState) => {
        const newUrls = [...prevState];
        newUrls[i] = response.data.secure_url;
        return newUrls;
      });
    }
    setIsPropertyPictures(true);
  };

  // TODO: Handling click on cross of uploaded image
  // const handleClickOnCross = (index: number) => {
  //   setIsImages((prev) => [
  //     ...prev.slice(0, index),
  //     false,
  //     ...prev.slice(index + 1, prev.length),
  //   ])

  //   setPortionCoverFileUrls((prev) => [
  //     ...prev.slice(0, index),
  //     "",
  //     ...prev.slice(index + 1, prev.length),
  //   ]);
  // }

  return (
    <div className="flex flex-col gap-20">
      <div className="space-y-8">
        <div>
          <span className="text-2xl font-semibold">
            Cover image Of the place
          </span>
          {/* <div>
                <h1>Image Upload</h1>
              </div> */}
          <div className="mt-5 ">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="space-y-1 text-center flex flex-col items-center">
                {propertyCoverFileUrl.length < 1 ? (
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
                      onClick={() => setPropertyCoverFileUrl("")}
                    />
                    <div className="flex flex-wrap gap-2">
                      <img
                        src={propertyCoverFileUrl}
                        className="w-48 h-48 rounded-lg"
                      />
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
                      onChange={(e) => uploadPropertyCoverFile(e)}
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
          <span className="text-lg font-semibold">Pictures of the place</span>
          <div className="mt-5 ">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {!isPropertyPictures ? (
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
                  <div className="flex flex-col items-center">
                    <MdCancel className=" text-center text-2xl cursor-pointer mb-2" />
                    <div className=" flex gap-2 w-full">
                      {Array.from({ length: 5 }, () => "").map((_, i) => (
                        <div className="flex flex-wrap gap-4 mx-2" key={i}>
                          {/* <MdCancel className=" text-right ml-auto text-xl cursor-pointer mt-12"/> */}
                          <img
                            src={PropertyPictureUrls[i]}
                            className="w-28 h-28 object-contain rounded-lg  border border-gray-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex text-sm text-neutral-6000 dark:text-neutral-300 justify-center">
                  <label
                    htmlFor="file-upload-2"
                    className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span className=" text-center ">Upload a file</span>
                    <input
                      id="file-upload-2"
                      name="file-upload-2"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={(e) => uploadPropertyPictures(e)}
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
              {/* <span>{index}</span>Pictures of the place */}
              <span>Portion {index + 1}</span>
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
              {/* <div>
                <h1>Image Upload</h1>
              </div> */}
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
                            src={portionCoverFileUrls[index]}
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
              <div className="mt-5">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {!isPortionPictures[index] ? (
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
                      <div className="flex flex-col">
                        <MdCancel className=" text-center text-2xl cursor-pointer mt-12" />
                        <div className="border border-white flex gap-2 w-full">
                          {Array.from({ length: 5 }, () => "").map((_, i) => (
                            <div className="flex flex-wrap gap-4 mx-2" key={i}>
                              {/* <MdCancel className=" text-right ml-auto text-xl cursor-pointer mt-12"/> */}
                              <img
                                src={portionPictureUrls[index][i]}
                                className="w-28 h-28 object-contain rounded-lg  border border-gray-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300 justify-center">
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
                          multiple
                          accept="image/*"
                          onChange={(e) => uploadPortionPictures(e, index)}
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