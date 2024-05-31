


import { jwtDecode } from "jwt-decode";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { TRequestFlat } from "./request.interface";
type TProps={
    payload:TRequestFlat,
    user:any
}
const createRequestFlatIntoDB = async ({payload,user}:TProps) => {

console.log(payload, user)

};

// const getAllBookingsFromDB=async()=>{
// const result =await prisma.request_flat.findMany()
// return result
// }

// const updateBookingIntoDB=async(bookingId:string, payload:Partial<Request>)=>{
//     console.log({bookingId})
//     const result =await prisma.request_flat.update({
//         where:{
//             id:bookingId
//         },
//         data:payload
//     })

//     return result
// }

export const requestServices = {
  createRequestFlatIntoDB
};
