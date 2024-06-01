// // import { NextFunction, Request, Response } from "express";
// // import httpStatus from "http-status";



// // const globalErrorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
// //   res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
// //     succcess:false,
// //     message:err.name || 'Something went wrong',
// //     error:err
// //   })
// // }

// // export default globalErrorHandler



// /* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
// import config from '../../config';


// import { Prisma } from '@prisma/client';
// import { ZodError } from 'zod';


// import { IGenericErrorMessage } from '../interface/error';
// import handleValidationError from '../errors/handleValidationError';
// import handleZodError from '../errors/zodError';
// import handleClientError from '../errors/handleClientError';
// import AppError from '../errors/AppError';

// const globalErrorHandler: ErrorRequestHandler = (
//   error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   config.env === 'development'
//     ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
//     : errorlogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

//   let statusCode = 500;
//   let message = 'Something went wrong !';
//   let errorMessages: IGenericErrorMessage[] = [];

//   if (error instanceof Prisma.PrismaClientValidationError) {
//     const simplifiedError = handleValidationError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (error instanceof ZodError) {
//     const simplifiedError = handleZodError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
//     const simplifiedError = handleClientError(error);
//     statusCode = simplifiedError.statusCode;
//     message = simplifiedError.message;
//     errorMessages = simplifiedError.errorMessages;
//   } else if (error instanceof AppError) {
//     statusCode = error?.statusCode;
//     message = error.message;
//     errorMessages = error?.message
//       ? [
//         {
//           path: '',
//           message: error?.message,
//         },
//       ]
//       : [];
//   } else if (error instanceof Error) {
//     message = error?.message;
//     errorMessages = error?.message
//       ? [
//         {
//           path: '',
//           message: error?.message,
//         },
//       ]
//       : [];
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorMessages,
//     stack: config.env !== 'production' ? error?.stack : undefined,
//   });
// };

// export default globalErrorHandler;



/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

import { IGenericErrorMessage } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/zodError';
import handleClientError from '../errors/handleClientError';
import AppError from '../errors/AppError';


const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.env === 'development') {
    console.log(` globalErrorHandler ~~`, { error });
  }

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;

