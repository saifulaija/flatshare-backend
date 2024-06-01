import { Booking } from "@prisma/client";

import prisma from "../../../shared/prisma";

type TProps = {
  payload: any;
  user: any;
};

const createBookingIntoDB = async (payload: any, user: any) => {
  const flatData = await prisma.flat.findUniqueOrThrow({
    where: {
      id: payload.flatId,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    const createBooking = await tx.booking.create({
      data: {
        flatId: payload.flatId,
        userId: user.userId,
      },
    });

    const createRequestFlat = await tx.request_Flat.create({
      data: {
        userName: payload.userName,

        email: payload.email,
        profession: payload.profession,
        contactNumber: payload.contactNumber,
        address: payload.address,
        additionalInformation: payload.additionalInformation,
        termsAndCondition: payload.termsAndCondition,
        flattId: payload.flatId,
        bookingId:createBooking.id
      },
    });

    return createBooking;
  });

  return result;
};

const myBooking = async (user: any) => {
  const result = await prisma.booking.findMany({
    where: {
      userId: user.userId,
    },
    include: {
      flat: {
        include:{
          image:true
        }
      }
    },
  });

  return result;
};

const updateBookingIntoDB = async (
  bookingId: string,
  payload: Partial<Booking>
) => {
  console.log({ bookingId });
  const result = await prisma.booking.update({
    where: {
      id: bookingId,
      flatId:payload.flatId
    },
    data: payload,
  });

  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  myBooking,
  updateBookingIntoDB,
};
