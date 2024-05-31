"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestServices = void 0;
const createRequestFlatIntoDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ payload, user }) {
    console.log(payload, user);
});
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
exports.requestServices = {
    createRequestFlatIntoDB
};
