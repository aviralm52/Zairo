import { User } from "@/models/user";
import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  const {
    propertyType,
    placeName,
    rentalForm,
    numberOfPortions,
    roomNumber,
    portionName,
    portionSize,
    guests,
    bedrooms,
    beds,
    bathroom,
    kitchen,
    childrenAge,
    additionalRules,
    reviews,
    propertyPictureUrls,
    portionCoverFileUrls,
    portionPictureUrls,
  } = await request.json();

  const user = new User({
    propertyType,
    placeName,
    rentalForm,
    numberOfPortions,
    roomNumber,
    portionName,
    portionSize,
    guests,
    bedrooms,
    beds,
    bathroom,
    kitchen,
    childrenAge,
    additionalRules,
    reviews,
    propertyPictureUrls,
    portionCoverFileUrls,
    portionPictureUrls,
  });

  try {
    const createdUser = await user.save();
    const response = NextResponse.json(user, { status: 200 });
    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to create user"
    })
  }

}
