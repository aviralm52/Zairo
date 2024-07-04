// import mongoose from 'mongoose';

// global.mongoose = {
//     conn: null,
//     promise: null,
// };

// export async function dbConnect(){
//     if (global.mongoose && global.mongoose.conn) {
//         console.log('connected from previous');
//         return global.mongoose.conn;
//     }else{
//         const conString = process.env.MONGODB_URI;
//         const promise = mongoose.connect(conString, {
//             autoIndex: true,
//         });

//         global.mongoose = {
//             conn: await promise,
//             promise,
//         };

//         console.log('Newly Connected')
//         return await promise;
//     }
// }


const {username, password} = process.env
export const connectionSrt = "mongodb+srv://"+username+":"+password+"@zairo.hon1apo.mongodb.net/Properties?retryWrites=true&w=majority&appName=Zairo"