import mongoose from "mongoose";
import {User} from "@/models/user"
export const connectDb = async () => {

    try{
        const {connection} = await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "work_manager",
        });
        console.log('Connected to mongodb');
        // console.log(connection);

        const data = new User({})
        await data.save();

    }catch(error){
        console.log('failed to connect to mongodb');
        console.log(error);
    }
}
