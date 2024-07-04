import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectionSrt from "@/lib/db";
import {Listing, Property} from "@/lib/model/property"

export async function GET(){

    mongoose.connect(connectionSrt)

    return NextResponse.json({result: true});
}

export async function POST(request){
    const payload = await request.json();
    console.log(payload)
    await mongoose.connect(connectionSrt);
    let listing = new Listing(payload)
    const result = await listing.save();   
    return NextResponse.json({result: true});

}   